"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { db } from "@/db";
import type { Appointment, BlockedSlot } from "@/db";
import { createSlots, getBookingDates, getStudioToday, isBookableDate } from "@/lib/booking";
import { z } from "zod";
import { sendBookingConfirmation, sendVerificationEmail } from "@/lib/email";

async function getRequestBaseUrl(): Promise<string | undefined> {
  try {
    const headersList = await headers();
    const host = headersList.get("x-forwarded-host") || headersList.get("host");
    const proto = headersList.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
    if (host) return `${proto}://${host}`;
  } catch {
    // outside request context
  }
  return undefined;
}

const appointmentInput = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.string().regex(/^\d{2}:\d{2}$/),
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(24),
  email: z.string().trim().email("Please enter a valid email for confirmation"),
  notes: z.string().trim().max(240).optional(),
});

// ─────────────────────────────────────────────
// GET AVAILABILITY
// ─────────────────────────────────────────────
export async function getAvailability(date: string) {
  if (!isBookableDate(date)) return { date, slots: [] };

  const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;

  const [apptSnap, blockedSnap] = await Promise.all([
    db.collection("appointments").where("date", "==", date).get(),
    db.collection("blockedSlots").where("date", "==", date).get(),
  ]);

  const activeBookedSlots = new Set<string>();
  apptSnap.forEach((doc) => {
    const d = doc.data() as Appointment;
    if (d.status === "confirmed") activeBookedSlots.add(d.slot);
    if (d.status === "pending" && d.createdAt instanceof Date && d.createdAt.getTime() > thirtyMinutesAgo) activeBookedSlots.add(d.slot);
  });

  const blockedSet = new Set<string>();
  blockedSnap.forEach((doc) => {
    const d = doc.data() as BlockedSlot;
    blockedSet.add(d.slot ?? "*");
  });

  return { date, slots: createSlots(date, activeBookedSlots, blockedSet) };
}

// ─────────────────────────────────────────────
// BOOK APPOINTMENT
// ─────────────────────────────────────────────
export async function bookAppointment(input: z.input<typeof appointmentInput>) {
  const parsed = appointmentInput.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0]?.message || "Please check your details and try again.";
    return { ok: false as const, error: issue };
  }
  if (!isBookableDate(parsed.data.date)) {
    return { ok: false as const, error: "That date is outside the booking window." };
  }

  // Clear expired pending slots for this date+slot
  const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
  const expiredSnap = await db.collection("appointments")
    .where("date", "==", parsed.data.date)
    .where("slot", "==", parsed.data.slot)
    .where("status", "==", "pending")
    .get();

  const batch = db.batch();
  expiredSnap.forEach((doc) => {
    const data = doc.data() as Appointment;
    if (data.createdAt instanceof Date && data.createdAt.getTime() < thirtyMinutesAgo) {
      batch.delete(doc.ref);
    }
  });
  await batch.commit();

  // Check availability
  const availability = await getAvailability(parsed.data.date);
  if (!availability.slots.some((s) => s.value === parsed.data.slot && s.available)) {
    return { ok: false as const, error: "That time is no longer available. Please select another slot." };
  }

  const newId = randomUUID();
  const token = randomUUID().replace(/-/g, "") + randomUUID().replace(/-/g, "");

  try {
    await db.collection("appointments").doc(newId).set({
      id: newId,
      date: parsed.data.date,
      slot: parsed.data.slot,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email ?? null,
      notes: parsed.data.notes ?? null,
      status: "pending",
      verificationToken: token,
      verifiedAt: null,
      createdAt: new Date(),
    });
  } catch {
    return { ok: false as const, error: "That time was just reserved. Please choose another slot." };
  }

  const reqBaseUrl = await getRequestBaseUrl();
  sendVerificationEmail({
    id: newId,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    date: parsed.data.date,
    slot: parsed.data.slot,
    token,
    notes: parsed.data.notes,
    baseUrl: reqBaseUrl,
  }).catch((err) => console.error("[Resend Email] Error sending verification email:", err));

  return {
    ok: true as const,
    pendingVerification: true as const,
    email: parsed.data.email,
    appointment: parsed.data,
  };
}

// ─────────────────────────────────────────────
// VERIFY APPOINTMENT
// ─────────────────────────────────────────────
export async function verifyAppointment(token: string) {
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return { ok: false as const, error: "Invalid verification link." };
  }

  const snap = await db.collection("appointments")
    .where("verificationToken", "==", token.trim())
    .limit(1)
    .get();

  if (snap.empty) {
    return { ok: false as const, error: "This confirmation link is invalid or has already been verified." };
  }

  const docRef = snap.docs[0].ref;
  const row = snap.docs[0].data();

  if (row.status === "confirmed") {
    return { ok: true as const, alreadyConfirmed: true, appointment: row };
  }

  const isExpired = Date.now() - (row.createdAt instanceof Date ? row.createdAt.getTime() : 0) > 30 * 60 * 1000;
  if (isExpired) {
    await docRef.delete();
    return { ok: false as const, error: "This confirmation link has expired (valid for 30 minutes). Please re-book your slot." };
  }

  await docRef.update({ status: "confirmed", verificationToken: null, verifiedAt: new Date() });

  sendBookingConfirmation({
    id: row.id,
    name: row.name,
    email: row.email || "",
    phone: row.phone,
    date: row.date,
    slot: row.slot,
    notes: row.notes,
  }).catch((err) => console.error("[Resend Email] Error sending confirmed emails:", err));

  return { ok: true as const, alreadyConfirmed: false, appointment: { ...row, status: "confirmed" } };
}

// ─────────────────────────────────────────────
// RESEND VERIFICATION EMAIL
// ─────────────────────────────────────────────
export async function resendVerificationEmail(date: string, slot: string, email: string) {
  const snap = await db.collection("appointments")
    .where("date", "==", date)
    .where("slot", "==", slot)
    .where("email", "==", email.trim())
    .where("status", "==", "pending")
    .limit(1)
    .get();

  if (snap.empty || !snap.docs[0].data().verificationToken) {
    return { ok: false as const, error: "No pending appointment found matching these details." };
  }

  const row = snap.docs[0].data();
  if (Date.now() - (row.createdAt instanceof Date ? row.createdAt.getTime() : 0) > 30 * 60 * 1000) {
    await snap.docs[0].ref.delete();
    return { ok: false as const, error: "The reservation has expired. Please select the slot again." };
  }

  const reqBaseUrl = await getRequestBaseUrl();
  await sendVerificationEmail({
    id: row.id,
    name: row.name,
    email: row.email || email,
    phone: row.phone,
    date: row.date,
    slot: row.slot,
    token: row.verificationToken,
    notes: row.notes,
    baseUrl: reqBaseUrl,
  });

  return { ok: true as const };
}

// ─────────────────────────────────────────────
// ADMIN: LIST APPOINTMENTS
// ─────────────────────────────────────────────
export async function listAppointments(): Promise<Appointment[]> {
  const today = getStudioToday();
  const snap = await db.collection("appointments")
    .where("date", ">=", today)
    .orderBy("date", "asc")
    .get();
  return snap.docs.map((d) => d.data() as Appointment);
}

// ─────────────────────────────────────────────
// ADMIN: CANCEL APPOINTMENT
// ─────────────────────────────────────────────
export async function cancelAppointment(id: string) {
  await db.collection("appointments").doc(id).delete();
  return { ok: true };
}

// ─────────────────────────────────────────────
// ADMIN: BLOCK / UNBLOCK SLOTS
// ─────────────────────────────────────────────
export async function blockSlot(date: string, slot?: string, reason?: string) {
  const id = randomUUID();
  await db.collection("blockedSlots").doc(id).set({
    id,
    date,
    slot: slot ?? null,
    reason: reason ?? null,
    createdAt: new Date(),
  });
  return { ok: true };
}

export async function listBlockedSlots(): Promise<BlockedSlot[]> {
  const today = getStudioToday();
  const snap = await db.collection("blockedSlots")
    .where("date", ">=", today)
    .orderBy("date", "asc")
    .get();
  return snap.docs.map((d) => d.data() as BlockedSlot);
}

export async function unblockSlot(id: string) {
  await db.collection("blockedSlots").doc(id).delete();
  return { ok: true };
}

// ─────────────────────────────────────────────
// BOOKING WINDOW
// ─────────────────────────────────────────────
export async function getBookingWindow() {
  return { today: getStudioToday(), dates: getBookingDates() };
}
