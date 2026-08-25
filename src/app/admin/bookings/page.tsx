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
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 text-[#043c74]">
      <div className="container mx-auto max-w-6xl px-6">
        
        <header className="mb-12 border-b border-gray-200 pb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight">Studio Memento</h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest opacity-60">Admin Dashboard</p>
          </div>
          <a href="/" className="text-sm font-bold underline underline-offset-4 hover:opacity-70 transition-opacity">Back to Site</a>
        </header>

        <AdminBookingList appointments={appointments} blockedSlots={blockedSlots} />
        
      </div>
    </main>
  );
}
