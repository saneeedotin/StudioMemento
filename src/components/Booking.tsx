"use client";

import { useEffect, useState, useTransition } from "react";
import { bookAppointment, getAvailability, getBookingWindow } from "@/app/actions";
import type { Slot } from "@/lib/booking";
import { formatSlot } from "@/lib/site";

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" }).format(new Date(`${date}T12:00:00`));
}

export default function Booking() {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function refresh(date: string) {
    const result = await getAvailability(date);
    setSlots(result.slots);
    setSelectedSlot((current) => result.slots.some((slot) => slot.value === current && slot.available) ? current : "");
  }

  useEffect(() => {
    getBookingWindow().then(({ dates: nextDates }) => {
      setDates(nextDates);
      setSelectedDate(nextDates[0] ?? "");
    });
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    const frame = window.requestAnimationFrame(() => void refresh(selectedDate));
    const interval = window.setInterval(() => void refresh(selectedDate), 15000);
    const onFocus = () => void refresh(selectedDate);
    window.addEventListener("focus", onFocus);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [selectedDate]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedDate || !selectedSlot) return;
    setMessage("");
    startTransition(async () => {
      const result = await bookAppointment({ date: selectedDate, slot: selectedSlot, ...form });
      if (!result.ok) {
        setMessage(result.error);
        await refresh(selectedDate);
        return;
      }
      setSuccess(true);
    });
  }

  return (
    <section id="booking" data-nav-theme="dark" className="relative overflow-hidden bg-night py-24 text-cream md:py-36">
      <div aria-hidden className="absolute inset-0 opacity-60 [background:radial-gradient(50%_60%_at_10%_20%,rgba(64,89,241,0.34),transparent_70%),radial-gradient(45%_55%_at_90%_70%,rgba(244,81,155,0.3),transparent_70%)]" />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <p className="font-script text-3xl text-pink-soft">make a little room for wonder —</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight md:text-7xl">Book your session.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-mist md:text-base">Choose a day, find your half hour, and we will have your stories waiting.</p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] shadow-lift backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-6 md:p-9 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">Choose a date</p><p className="mt-2 text-sm text-cream/70">Open for the next 14 days</p></div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-mist">IST</span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {dates.map((date) => (
                <button key={date} type="button" onClick={() => { setSelectedDate(date); setSuccess(false); setMessage(""); }} className={`min-h-16 rounded-xl border px-3 text-left transition-all duration-300 hover:-translate-y-0.5 ${selectedDate === date ? "border-pink bg-pink text-white shadow-glow-pink" : "border-white/10 bg-white/[0.04] text-cream/75 hover:border-blue/70 hover:bg-blue/10"}`}>
                  <span className="block text-xs uppercase tracking-[0.12em] opacity-65">{dateLabel(date).split(" ")[0]}</span>
                  <span className="mt-1 block text-sm font-semibold">{dateLabel(date).slice(4)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-9">
            {success ? (
              <div className="flex min-h-64 flex-col justify-center">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-soft">You are on the list</span>
                <h3 className="mt-4 font-display text-4xl font-bold uppercase">See you soon.</h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">Your styling consultation is held for {dateLabel(selectedDate)} at {formatSlot(Number(selectedSlot.split(":")[0]) * 60 + Number(selectedSlot.split(":")[1]))}.</p>
                <button type="button" onClick={() => { setSuccess(false); setSelectedSlot(""); void refresh(selectedDate); }} className="mt-8 w-fit text-sm font-semibold text-pink-soft underline underline-offset-4">Book another time</button>
              </div>
            ) : selectedSlot ? (
              <form onSubmit={submit} className="space-y-5">
                <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">Your details</p><p className="mt-2 text-sm text-cream/70">{dateLabel(selectedDate)} · {formatSlot(Number(selectedSlot.split(":")[0]) * 60 + Number(selectedSlot.split(":")[1]))}</p></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(["name", "phone", "email"] as const).map((field) => <label key={field} className="block sm:last:col-span-2"><span className="mb-2 block text-xs uppercase tracking-[0.14em] text-mist">{field}{field !== "email" ? " *" : ""}</span><input required={field !== "email"} type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-cream outline-none transition-colors focus:border-pink" /></label>)}
                </div>
                <label className="block"><span className="mb-2 block text-xs uppercase tracking-[0.14em] text-mist">A note, if you like</span><textarea rows={2} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="w-full resize-none border-b border-white/20 bg-transparent py-2 text-sm text-cream outline-none transition-colors focus:border-pink" /></label>
                {message && <p role="alert" className="text-sm text-pink-soft">{message}</p>}
                <div className="flex items-center gap-5 pt-2"><button disabled={isPending} className="rounded-full bg-pink px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-pink-deep disabled:cursor-wait disabled:opacity-60">{isPending ? "Holding your time..." : "Confirm session"}</button><button type="button" onClick={() => setSelectedSlot("")} className="text-sm text-mist transition-colors hover:text-cream">Back to times</button></div>
              </form>
            ) : (
              <div><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist">Find your half hour</p><p className="mt-2 text-sm text-cream/70">{selectedDate ? dateLabel(selectedDate) : "Choose a day"}</p></div><span className="text-xs text-mist">{slots.filter((slot) => slot.available).length} open</span></div><div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">{slots.map((slot) => <button key={slot.value} type="button" disabled={!slot.available} onClick={() => setSelectedSlot(slot.value)} className={`rounded-xl border px-3 py-3 text-left text-sm transition-all duration-300 ${slot.available ? "border-white/10 bg-white/[0.04] text-cream hover:-translate-y-0.5 hover:border-pink hover:bg-pink/10" : "cursor-not-allowed border-white/5 text-mist/40 line-through"}`}>{slot.label}</button>)}</div></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
