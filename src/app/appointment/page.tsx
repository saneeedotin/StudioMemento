import AppointmentForm from "@/components/AppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Studio Memento",
  description: "Book your styling consultation with Studio Memento.",
};

export default function AppointmentPage() {
  return (
    <main>
      <AppointmentForm />
    </main>
  );
}
