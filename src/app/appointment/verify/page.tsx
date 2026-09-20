import Link from "next/link";
import SubpageNav from "@/components/SubpageNav";
import { verifyAppointment } from "@/app/actions";
import { SITE, formatSlot } from "@/lib/site";
import { formatEmailDate, generateGoogleCalendarUrl } from "@/lib/email";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Appointment | Studio Memento",
  description: "Confirm your appointment at Studio Memento.",
};

export default async function VerifyAppointmentPage(props: {
  searchParams: Promise<{ token?: string }>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams.token || "";

  const result = await verifyAppointment(token);

  return (
    <main className="flex-1 bg-[#1A4083] text-[#FAF6F0] min-h-screen relative overflow-hidden flex flex-col">
      <SubpageNav theme="dark" />

      <div className="flex-1 flex items-center justify-center pt-28 sm:pt-40 pb-20 px-4 sm:px-8">
        <div className="w-full max-w-xl bg-[#FAF6F0] rounded-[2.5rem] p-6 sm:p-12 shadow-2xl text-[#1B4083] relative z-10 border border-[#1B4083]/10">
          {result.ok ? (
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFC8D4] text-[#1B4083] text-3xl shadow-md">
                ✓
              </div>

              <span className="inline-block rounded-full bg-[#FFC8D4]/50 border border-[#1B4083]/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#1B4083] mb-3">
                {result.alreadyConfirmed ? "✦ Already Confirmed ✦" : "✦ Verified & Confirmed ✦"}
              </span>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1B4083]">
                See you at the bench.
              </h1>

              <p className="mt-3 text-base sm:text-lg text-[#1B4083]/80 leading-relaxed">
                Thank you, <strong>{result.appointment.name}</strong>! Your email has been verified and your private styling session is officially reserved.
              </p>

              {/* Reservation Details Card */}
              <div className="mt-8 bg-white rounded-2xl p-6 border border-[#1B4083]/10 shadow-sm text-left space-y-3">
                <div className="flex items-center justify-between border-b border-[#1B4083]/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B4083]/60">Date</span>
                  <span className="text-sm sm:text-base font-bold text-[#1B4083]">
                    📅 {formatEmailDate(result.appointment.date)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#1B4083]/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B4083]/60">Time</span>
                  <span className="text-sm sm:text-base font-bold text-[#1B4083]">
                    ⏱ {(() => {
                      const [h, m] = result.appointment.slot.split(":").map(Number);
                      return formatSlot(h * 60 + m);
                    })()} (IST)
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B4083]/60 block mb-1">Location</span>
                  <span className="text-xs sm:text-sm text-[#1B4083]/80 leading-relaxed block">
                    📍 {SITE.fullAddress}
                  </span>
                </div>

                {result.appointment.notes && (
                  <div className="pt-2 border-t border-dashed border-[#1B4083]/15">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1B4083]/60 block mb-1">Your Vision</span>
                    <span className="text-xs sm:text-sm text-[#1B4083]/80 italic block">
                      "{result.appointment.notes}"
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={SITE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1B4083] px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all hover:bg-[#0F2753] hover:scale-105"
                >
                  <span>Google Maps Directions</span>
                  <span>↗</span>
                </a>

                {(() => {
                  const calUrl = generateGoogleCalendarUrl(
                    result.appointment.date,
                    result.appointment.slot,
                    result.appointment.name
                  );
                  if (!calUrl) return null;
                  return (
                    <a
                      href={calUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#1B4083]/30 px-6 py-3.5 text-sm font-semibold text-[#1B4083] hover:bg-[#1B4083]/5 transition-all"
                    >
                      <span>+ Google Calendar</span>
                    </a>
                  );
                })()}
              </div>

              {/* Contact Help */}
              <p className="mt-8 text-xs text-[#1B4083]/60">
                Need to adjust or have questions? WhatsApp us at{" "}
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="font-bold underline text-[#1B4083]">
                  {SITE.phone}
                </a>.
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              {/* Error Icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl shadow-sm">
                !
              </div>

              <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-red-700 mb-3">
                Confirmation Notice
              </span>

              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1B4083]">
                Unable to Verify Link
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#1B4083]/80 leading-relaxed max-w-md mx-auto">
                {result.error}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center rounded-full bg-[#1B4083] px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg transition-all hover:bg-[#0F2753]"
                >
                  Book a Consultation →
                </Link>

                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#1B4083]/20 px-6 py-3.5 text-sm font-semibold text-[#1B4083] hover:bg-[#1B4083]/5 transition-all"
                >
                  Need Help? WhatsApp Studio
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
