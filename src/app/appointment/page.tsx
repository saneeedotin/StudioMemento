import AppointmentForm from "@/components/AppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Studio Memento",
  description: "Book your styling consultation with Studio Memento.",
};

export default function AppointmentPage() {
  return (
    <main className="flex-1 bg-[#1A4083] text-[#FAF6F0] min-h-screen relative overflow-hidden">
      <AppointmentForm />
    </main>
  );
}
