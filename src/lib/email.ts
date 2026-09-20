import { Resend } from "resend";
import { SITE, formatSlot } from "@/lib/site";

export interface BookingEmailData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  slot: string; // HH:MM
  notes?: string | null;
}

export function formatEmailDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dateObj = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(dateObj);
  } catch {
    return dateStr;
  }
}

export function formatSlotLabel(slotStr: string): string {
  try {
    const [hour, minute] = slotStr.split(":").map(Number);
    return formatSlot(hour * 60 + minute);
  } catch {
    return slotStr;
  }
}

export function generateGoogleCalendarUrl(dateStr: string, slotStr: string, name: string): string {
  try {
    const [hour, min] = slotStr.split(":").map(Number);
    const startIso = `${dateStr.replace(/-/g, "")}T${slotStr.replace(/:/g, "")}00`;
    const endMinutes = hour * 60 + min + 30;
    const endHour = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;
    const endIso = `${dateStr.replace(/-/g, "")}T${String(endHour).padStart(2, "0")}${String(endMin).padStart(2, "0")}00`;

    const title = encodeURIComponent(`Studio Memento Styling · ${name}`);
    const details = encodeURIComponent(
      `Private Keepsake Styling & Consultation at Studio Memento.\n\nAddress: ${SITE.fullAddress}\nPhone: ${SITE.phone}`
    );
    const location = encodeURIComponent(SITE.fullAddress);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&ctz=Asia/Kolkata&details=${details}&location=${location}`;
  } catch {
    return "";
  }
}

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export interface VerificationEmailData {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
  token: string;
  notes?: string | null;
  baseUrl?: string;
}

/**
 * Sends a verification email containing a 1-click confirmation button.
 */
export async function sendVerificationEmail(data: VerificationEmailData) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      `[Resend Email] RESEND_API_KEY is not configured in environment variables. Verification email skipped for ${data.email}.`
    );
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Studio Memento <onboarding@resend.dev>";

  const humanDate = formatEmailDate(data.date);
  const humanTime = formatSlotLabel(data.slot);
  const appBase = (data.baseUrl || getBaseUrl()).replace(/\/$/, "");
  const verificationUrl = `${appBase}/appointment/verify?token=${encodeURIComponent(data.token)}`;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: data.email.trim(),
      subject: `Please confirm your Studio Memento appointment ✦ (${humanDate})`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Your Studio Memento Appointment</title>
</head>
<body style="margin:0; padding:0; background-color:#FAF6F0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1B4083;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#FAF6F0; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:580px; background-color:#ffffff; border-radius:28px; overflow:hidden; border:1px solid rgba(27,64,131,0.12); box-shadow:0 12px 36px rgba(27,64,131,0.06);">
          
          <!-- Header Brand Bar -->
          <tr>
            <td style="background-color:#1B4083; padding:36px 32px 32px 32px; text-align:center;">
              <span style="display:inline-block; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#FFC8D4; font-weight:700; margin-bottom:10px;">
                ✦ Email Verification ✦
              </span>
              <h1 style="margin:0; font-size:28px; font-weight:800; color:#FAF6F0; letter-spacing:-0.02em;">
                Studio Memento
              </h1>
              <p style="margin:6px 0 0 0; font-size:13px; color:#FAF6F0; opacity:0.8; font-style:italic;">
                wear your own story.
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:36px 32px;">
              <p style="margin:0 0 16px 0; font-size:17px; font-weight:600; color:#1B4083;">
                Warm greetings, ${data.name},
              </p>
              <p style="margin:0 0 20px 0; font-size:15px; line-height:1.6; color:#1B4083; opacity:0.85;">
                You recently requested a private styling consultation at Studio Memento. Please click the button below to verify your email and lock in your appointment slot:
              </p>

              <!-- Prominent Verification CTA Button -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:28px 0 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${verificationUrl}" target="_blank" style="display:inline-block; background-color:#1B4083; color:#ffffff; font-size:15px; font-weight:700; text-decoration:none; padding:18px 40px; border-radius:999px; letter-spacing:0.04em; text-align:center; box-shadow:0 6px 20px rgba(27,64,131,0.25);">
                      ✦ Confirm My Appointment ↗
                    </a>
                    <p style="margin:12px 0 0 0; font-size:12px; color:#1B4083; opacity:0.65; font-weight:500;">
                      ⏳ This verification link expires in 30 minutes.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Appointment Overview -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#FFF5F2; border:1px solid #FFC8D4; border-radius:20px; padding:20px 24px; margin-bottom:28px;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px 0; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#1B4083; opacity:0.6;">
                      Requested Reservation
                    </p>
                    <p style="margin:0 0 6px 0; font-size:15px; font-weight:700; color:#1B4083;">
                      📅 ${humanDate}
                    </p>
                    <p style="margin:0 0 6px 0; font-size:15px; font-weight:700; color:#1B4083;">
                      ⏱ ${humanTime} (IST)
                    </p>
                    <p style="margin:0; font-size:13px; color:#1B4083; opacity:0.85;">
                      📍 ${SITE.fullAddress}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Fallback URL -->
              <p style="margin:0 0 12px 0; font-size:12px; line-height:1.5; color:#1B4083; opacity:0.65;">
                Button not working? Copy and paste this link into your browser:<br>
                <a href="${verificationUrl}" style="color:#1B4083; font-weight:600; word-break:break-all;">${verificationUrl}</a>
              </p>

              <div style="border-top:1px solid rgba(27,64,131,0.1); padding-top:18px; margin-top:24px; font-size:12px; color:#1B4083; opacity:0.65;">
                If you did not request this booking, no further action is needed and the slot will be released automatically.
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FAF6F0; padding:20px 32px; text-align:center; border-top:1px solid rgba(27,64,131,0.08);">
              <p style="margin:0 0 4px 0; font-size:12px; font-weight:600; color:#1B4083;">
                Studio Memento · Dombivli East
              </p>
              <p style="margin:0; font-size:11px; color:#1B4083; opacity:0.6;">
                Phone / WhatsApp: ${SITE.phone}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });
    return { ok: true, data: result };
  } catch (err: any) {
    console.error("[Resend Email] Failed to send verification email:", err);
    return { ok: false, error: err.message };
  }
}

/**
 * Sends booking confirmation to the client and notification to the studio team.
 * Safe against missing API keys: will log cleanly without interrupting booking flow.
 */
export async function sendBookingConfirmation(data: BookingEmailData) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      `[Resend Email] RESEND_API_KEY is not configured in environment variables. Email confirmation skipped for ${data.email || data.name}.`
    );
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Studio Memento <onboarding@resend.dev>";
  const studioNotifyEmail = process.env.STUDIO_NOTIFY_EMAIL || "hello@studiomemento.in";

  const humanDate = formatEmailDate(data.date);
  const humanTime = formatSlotLabel(data.slot);
  const calendarUrl = generateGoogleCalendarUrl(data.date, data.slot, data.name);

  const results = {
    customerEmailSent: false,
    studioAlertSent: false,
  };

  // 1. Send confirmation email to Customer (if valid email provided)
  if (data.email && data.email.trim().length > 0) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to: data.email.trim(),
        subject: `Your Studio Memento Consultation is Confirmed ✦ (${humanDate})`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Studio Memento Consultation</title>
</head>
<body style="margin:0; padding:0; background-color:#FAF6F0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1B4083;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#FAF6F0; padding:40px 16px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:580px; background-color:#ffffff; border-radius:28px; overflow:hidden; border:1px solid rgba(27,64,131,0.12); box-shadow:0 12px 36px rgba(27,64,131,0.06);">
          
          <!-- Header Brand Bar -->
          <tr>
            <td style="background-color:#1B4083; padding:36px 32px 32px 32px; text-align:center;">
              <span style="display:inline-block; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#FFC8D4; font-weight:700; margin-bottom:10px;">
                ✦ Private Studio Session ✦
              </span>
              <h1 style="margin:0; font-size:28px; font-weight:800; color:#FAF6F0; letter-spacing:-0.02em;">
                Studio Memento
              </h1>
              <p style="margin:6px 0 0 0; font-size:13px; color:#FAF6F0; opacity:0.8; font-style:italic;">
                wear your own story.
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:36px 32px;">
              <p style="margin:0 0 16px 0; font-size:17px; font-weight:600; color:#1B4083;">
                Warm greetings, ${data.name},
              </p>
              <p style="margin:0 0 24px 0; font-size:15px; line-height:1.6; color:#1B4083; opacity:0.85;">
                Your private styling consultation is officially reserved on our studio bench. We look forward to meeting you, hearing your story, and curating your custom keepsakes.
              </p>

              <!-- Reservation Summary Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#FFF5F2; border:1px solid #FFC8D4; border-radius:20px; padding:24px; margin-bottom:28px;">
                <tr>
                  <td>
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#1B4083; opacity:0.6;">Appointment Date</span>
                          <div style="font-size:17px; font-weight:700; color:#1B4083; margin-top:3px;">
                            📅 ${humanDate}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:12px;">
                          <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#1B4083; opacity:0.6;">Time Slot</span>
                          <div style="font-size:17px; font-weight:700; color:#1B4083; margin-top:3px;">
                            ⏱ ${humanTime} (IST)
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:12px;">
                          <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#1B4083; opacity:0.6;">Studio Location</span>
                          <div style="font-size:14px; font-weight:600; color:#1B4083; margin-top:3px; line-height:1.5;">
                            📍 ${SITE.fullAddress}
                          </div>
                        </td>
                      </tr>
                      ${
                        data.notes
                          ? `
                      <tr>
                        <td style="padding-top:6px; border-top:1px dashed rgba(27,64,131,0.15);">
                          <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#1B4083; opacity:0.6;">Your Notes / Vision</span>
                          <div style="font-size:13px; color:#1B4083; margin-top:4px; font-style:italic;">
                            "${data.notes}"
                          </div>
                        </td>
                      </tr>
                      `
                          : ""
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <a href="${SITE.mapsLink}" target="_blank" style="display:inline-block; background-color:#1B4083; color:#ffffff; font-size:13px; font-weight:700; text-decoration:none; padding:14px 28px; border-radius:999px; letter-spacing:0.04em; text-align:center; box-shadow:0 4px 14px rgba(27,64,131,0.25);">
                      Open Google Maps Directions ↗
                    </a>
                  </td>
                </tr>
                ${
                  calendarUrl
                    ? `
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" target="_blank" style="display:inline-block; background-color:#FAF6F0; color:#1B4083; font-size:12px; font-weight:700; text-decoration:none; padding:10px 22px; border-radius:999px; border:1px solid rgba(27,64,131,0.2);">
                      + Add to Google Calendar
                    </a>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              <!-- What to Expect / Studio Info -->
              <div style="border-top:1px solid rgba(27,64,131,0.1); padding-top:20px; font-size:13px; line-height:1.6; color:#1B4083; opacity:0.85;">
                <p style="margin:0 0 10px 0; font-weight:600;">
                  ✦ What to expect at your session:
                </p>
                <ul style="margin:0 0 16px 0; padding-left:20px;">
                  <li>Our walk-in charm bar with 60+ symbolic charms and custom chains will be open for you.</li>
                  <li>Permanent jewellery sparking takes just 15 minutes.</li>
                  <li>Feel welcome to bring any reference images or heirloom stories you would love to reset.</li>
                </ul>
                <p style="margin:0; font-size:12px; opacity:0.8;">
                  Need to change your time? Call or WhatsApp us directly at <a href="${SITE.phoneHref}" style="color:#1B4083; font-weight:700;">${SITE.phone}</a>.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FAF6F0; padding:24px 32px; text-align:center; border-top:1px solid rgba(27,64,131,0.08);">
              <p style="margin:0 0 8px 0; font-size:12px; font-weight:600; color:#1B4083;">
                Studio Memento · Dombivli East
              </p>
              <p style="margin:0; font-size:11px; color:#1B4083; opacity:0.6;">
                <a href="${SITE.instagram}" target="_blank" style="color:#1B4083; text-decoration:none; margin:0 8px;">Instagram</a> • 
                <a href="${SITE.whatsapp}" target="_blank" style="color:#1B4083; text-decoration:none; margin:0 8px;">WhatsApp</a> • 
                <a href="${SITE.mapsLink}" target="_blank" style="color:#1B4083; text-decoration:none; margin:0 8px;">Visit Studio</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });
      results.customerEmailSent = true;
    } catch (err) {
      console.error("[Resend Email] Failed to send customer confirmation:", err);
    }
  }

  // 2. Send notification to the Studio Team
  if (studioNotifyEmail && studioNotifyEmail.trim().length > 0) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to: studioNotifyEmail.trim(),
        subject: `✦ New Appointment Booked: ${data.name} (${humanDate} @ ${humanTime})`,
        html: `
<!DOCTYPE html>
<html>
<body style="font-family:sans-serif; background:#f4f4f4; padding:24px; color:#1B4083;">
  <div style="max-width:520px; margin:0 auto; background:#ffffff; padding:28px; border-radius:16px; border:1px solid #e2e8f0;">
    <h2 style="margin-top:0; color:#1B4083;">✦ New Studio Booking Received</h2>
    <p style="font-size:14px; color:#475569;">A customer just booked an appointment on the website.</p>
    
    <div style="background:#FAF6F0; padding:16px; border-radius:12px; margin:20px 0; font-size:14px; line-height:1.6;">
      <p style="margin:4px 0;"><strong>Customer Name:</strong> ${data.name}</p>
      <p style="margin:4px 0;"><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a> (<a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}">Chat on WhatsApp</a>)</p>
      <p style="margin:4px 0;"><strong>Email:</strong> ${data.email || "Not provided"}</p>
      <p style="margin:4px 0;"><strong>Date:</strong> ${humanDate} (${data.date})</p>
      <p style="margin:4px 0;"><strong>Time Slot:</strong> ${humanTime} (${data.slot})</p>
      ${data.notes ? `<p style="margin:4px 0;"><strong>Notes:</strong> ${data.notes}</p>` : ""}
    </div>

    <p style="font-size:12px; color:#94a3b8; margin-bottom:0;">
      Studio Memento Automated Booking System
    </p>
  </div>
</body>
</html>
        `,
      });
      results.studioAlertSent = true;
    } catch (err) {
      console.error("[Resend Email] Failed to send studio alert email:", err);
    }
  }

  return { ok: true, results };
}
