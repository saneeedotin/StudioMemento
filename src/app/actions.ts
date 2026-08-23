"use server";

import { randomUUID } from "node:crypto";
import { asc, eq, gte } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { appointments, blockedSlots } from "@/db/schema";
import { createSlots, getBookingDates, getStudioToday, isBookableDate } from "@/lib/booking";
import { z } from "zod";

let ready = false;

async function ensureTables() {
  if (ready) return;
  await db.run(sql`CREATE TABLE IF NOT EXISTS appointments (id text PRIMARY KEY NOT NULL, date text NOT NULL, slot text NOT NULL, name text NOT NULL, phone text NOT NULL, email text, notes text, created_at integer NOT NULL)`);
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS appointments_date_slot_unique ON appointments (date, slot)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS blocked_slots (id text PRIMARY KEY NOT NULL, date text NOT NULL, slot text, reason text, created_at integer NOT NULL)`);
  ready = true;
}

const appointmentInput = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.string().regex(/^\d{2}:\d{2}$/),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(24),
  email: z.string().trim().email().optional().or(z.literal("")),
  notes: z.string().trim().max(240).optional(),
});

export async function getAvailability(date: string) {
  await ensureTables();
  if (!isBookableDate(date)) return { date, slots: [] };
  const [bookedRows, blockedRows] = await Promise.all([
    db.select({ slot: appointments.slot }).from(appointments).where(eq(appointments.date, date)),
    db.select({ slot: blockedSlots.slot }).from(blockedSlots).where(eq(blockedSlots.date, date)),
  ]);
  return { date, slots: createSlots(date, new Set(bookedRows.map((row) => row.slot)), new Set(blockedRows.map((row) => row.slot ?? "*"))) };
}

export async function bookAppointment(input: z.input<typeof appointmentInput>) {
  const parsed = appointmentInput.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Please check your details and try again." };
  if (!isBookableDate(parsed.data.date)) return { ok: false as const, error: "That date is outside the booking window." };
  if (!createSlots(parsed.data.date, new Set(), new Set()).some((slot) => slot.value === parsed.data.slot && slot.available)) {
    return { ok: false as const, error: "That time is no longer available." };
  }

  await ensureTables();
  try {
    await db.insert(appointments).values({ id: randomUUID(), ...parsed.data, createdAt: new Date() });
  } catch {
    return { ok: false as const, error: "That time was just booked. Please choose another slot." };
  }
  return { ok: true as const, appointment: parsed.data };
}

export async function listAppointments() {
  await ensureTables();
  return db.select().from(appointments).where(gte(appointments.date, getStudioToday())).orderBy(asc(appointments.date), asc(appointments.slot));
}

export async function cancelAppointment(id: string) {
  await ensureTables();
  await db.delete(appointments).where(eq(appointments.id, id));
  return { ok: true };
}

export async function blockSlot(date: string, slot?: string, reason?: string) {
  await ensureTables();
  await db.insert(blockedSlots).values({ id: randomUUID(), date, slot: slot || null, reason: reason || null, createdAt: new Date() });
  return { ok: true };
}

export async function getBookingWindow() {
  return { today: getStudioToday(), dates: getBookingDates() };
}
