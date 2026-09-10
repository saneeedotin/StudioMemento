import AdminBookingList from "@/components/AdminBookingList";
import { listAppointments, listBlockedSlots } from "@/app/actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Bookings | Studio Memento",
  robots: "noindex, nofollow",
};

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
  const appointments = await listAppointments();
  const blockedSlots = await listBlockedSlots();

  return (
    <main className="min-h-screen bg-[#FAF6F0] pt-24 pb-12 text-[#1B4083]">
      <div className="container mx-auto max-w-6xl px-6">
        
        <header className="mb-12 border-b border-[#1B4083]/20 pb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#1B4083]">Studio Memento</h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-[#1B4083]/60">Admin Dashboard</p>
          </div>
          <a href="/" className="text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity border border-[#1B4083]/20 px-4 py-2 rounded-full text-[#1B4083] hover:bg-[#1B4083] hover:text-[#FAF6F0]">Back to Site</a>
        </header>

        <AdminBookingList appointments={appointments} blockedSlots={blockedSlots} />
        
      </div>
    </main>
  );
}
