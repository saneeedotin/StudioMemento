"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { bookAppointment, getAvailability, getBookingWindow } from "@/app/actions";
import type { Slot } from "@/lib/booking";
import { formatSlot } from "@/lib/site";

function dateLabel(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" }).format(new Date(`${date}T12:00:00`));
}

const UPCOMING_WORKSHOPS = [
  {
    title: "Jewelry Casting Masterclass",
    date: "Oct 12, 2026",
    time: "10:00 AM - 2:00 PM",
    image: "/images/heart-card-editorial.png",
    spots: 2,
  },
  {
    title: "Bespoke Ring Making",
    date: "Nov 05, 2026",
    time: "1:00 PM - 5:00 PM",
    image: "/images/earrings.png",
    spots: 5,
  },
  {
    title: "Gemstone Setting Fundamentals",
    date: "Nov 20, 2026",
    time: "9:00 AM - 1:00 PM",
    image: "/images/necklace.png",
    spots: 0,
  }
];

export default function AppointmentForm() {
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
    <div className="min-h-screen bg-[#043c74] py-8 md:py-12 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div data-hero-glow aria-hidden className="hidden md:block pointer-events-none absolute -top-[5%] left-[35%] h-[15%] w-[30%] rounded-full bg-[#fecbd7] blur-[2.5rem] opacity-90" />
      <div aria-hidden className="pointer-events-none absolute -bottom-[20%] -left-[10%] h-[70%] w-[45%] rounded-[100%] bg-[radial-gradient(ellipse,#fecbd7_0%,#f0c5d4_45%,#a998b5_70%,transparent_80%)] blur-[4.5rem] opacity-85" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(252,202,214,0.06))] md:bg-[radial-gradient(circle_at_53%_0%,rgba(255,255,255,0.6),transparent_18%),linear-gradient(180deg,transparent_58%,rgba(252,202,214,0.06))]" />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        
        <div className="mb-8">
          <a href="/" className="inline-block text-xs font-bold uppercase tracking-widest text-[#fecbd7] opacity-80 hover:opacity-100 transition-opacity mb-2">
            ← Back to Home
          </a>
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl lg:text-5xl text-[#fecbd7]">
            Book a Session
          </h1>
          <p className="mt-2 text-base opacity-90 font-serif italic text-white max-w-2xl">
            Choose a day, find your half hour, and we will have your stories waiting.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* MAIN COLUMN: Booking */}
          <div className="w-full lg:w-2/3">
            {success ? (
              <div className="rounded-[2rem] bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#043c74]/60">You are on the list</span>
                <h3 className="mt-4 font-display text-4xl font-bold uppercase text-[#043c74]">See you soon.</h3>
                <p className="mt-4 text-lg leading-relaxed text-[#043c74]/80">
                  Your styling consultation is held for <strong>{dateLabel(selectedDate)}</strong> at <strong>{formatSlot(Number(selectedSlot.split(":")[0]) * 60 + Number(selectedSlot.split(":")[1]))}</strong>.
                </p>
                <button 
                  type="button" 
                  onClick={() => { setSuccess(false); setSelectedSlot(""); void refresh(selectedDate); }} 
                  className="mt-8 text-sm font-bold underline underline-offset-4 text-[#043c74] hover:text-black transition-colors"
                >
                  Book another time
                </button>
              </div>
            ) : (
              <div className="rounded-[2rem] bg-white p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                
                {/* Side-by-Side Calendar & Time */}
                <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
                  
                  {/* Left: Proper Calendar */}
                  <div className="w-full md:w-[55%]">
                    
                    {(() => {
                      const today = new Date();
                      // We'll use the first available date's month, or just today's month
                      const displayDate = selectedDate ? new Date(`${selectedDate}T12:00:00`) : new Date();
                      const year = displayDate.getFullYear();
                      const month = displayDate.getMonth();
                      
                      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(displayDate);
                      const daysInMonth = new Date(year, month + 1, 0).getDate();
                      const firstDayOfMonth = new Date(year, month, 1).getDay();
                      const startingBlanks = (firstDayOfMonth + 6) % 7; // 0 = Mon, 6 = Sun
                      
                      const blanks = Array.from({ length: startingBlanks }).fill(null);
                      const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
                        const d = i + 1;
                        return `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                      });
                      const allCells = [...blanks, ...monthDays];

                      return (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-[#043c74]/60">{monthName}</p>
                            <span className="rounded-full border border-[#043c74]/20 px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest text-[#043c74]">IST</span>
                          </div>
                          
                          {/* Days of Week */}
                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                              <div key={day} className="text-center text-[10px] font-bold text-[#043c74]/50">
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Grid */}
                          <div className="grid grid-cols-7 gap-1">
                            {allCells.map((dateStr, i) => {
                              if (!dateStr) {
                                return <div key={`blank-${i}`} className="w-full aspect-square" />;
                              }
                              const isAvailable = dates.includes(dateStr as string);
                              const isSelected = selectedDate === dateStr;
                              const dayNum = Number((dateStr as string).split("-")[2]);

                              return (
                                <button 
                                  key={dateStr as string}
                                  type="button"
                                  disabled={!isAvailable}
                                  onClick={() => { setSelectedDate(dateStr as string); setMessage(""); setSelectedSlot(""); }}
                                  className={`w-full aspect-square max-w-[2.5rem] sm:max-w-[3rem] mx-auto rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                                    isSelected 
                                      ? "bg-[#043c74] text-white shadow-md" 
                                      : isAvailable 
                                        ? "bg-gray-50 text-[#043c74] hover:bg-[#043c74]/10 border border-gray-200" 
                                        : "text-gray-300 cursor-not-allowed"
                                  }`}
                                >
                                  {dayNum}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Right: Times */}
                  <div className="w-full md:w-[45%]">
                    <div className="flex items-center justify-between mb-4 mt-6 md:mt-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#043c74]/60">Select Time</p>
                      <p className="text-[11px] font-bold text-[#043c74]">{selectedDate ? dateLabel(selectedDate) : ""}</p>
                    </div>

                    {!selectedDate ? (
                      <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl">
                        <p className="text-xs font-semibold text-[#043c74]/40 uppercase tracking-widest">Select a date first</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {slots.map((slot) => (
                          <button 
                            key={slot.value} 
                            type="button" 
                            disabled={!slot.available} 
                            onClick={() => setSelectedSlot(slot.value)} 
                            className={`rounded-xl border py-2.5 flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 ${!slot.available ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400 line-through" : selectedSlot === slot.value ? "border-[#043c74] bg-[#043c74] text-white shadow-md" : "border-gray-200 bg-white text-[#043c74] hover:border-[#043c74]/30 hover:bg-gray-50"}`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Form (Appears below when a time is selected) */}
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${selectedSlot ? "max-h-[1000px] opacity-100 mt-8 pt-6 border-t border-gray-100" : "max-h-0 opacity-0 mt-0 pt-0 border-t-0"}`}>
                  <div className="mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#043c74]/60">Your Details</p>
                    <h3 className="font-display text-xl font-bold uppercase mt-1 text-[#043c74]">Complete Booking</h3>
                  </div>

                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-70 text-[#043c74]">Name *</span>
                        <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border-b border-gray-300 bg-transparent py-1.5 text-sm text-[#043c74] outline-none transition-colors focus:border-[#043c74]" />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-70 text-[#043c74]">Phone *</span>
                        <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border-b border-gray-300 bg-transparent py-1.5 text-sm text-[#043c74] outline-none transition-colors focus:border-[#043c74]" />
                      </label>
                    </div>
                    
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-70 text-[#043c74]">Email</span>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border-b border-gray-300 bg-transparent py-1.5 text-sm text-[#043c74] outline-none transition-colors focus:border-[#043c74]" />
                    </label>
                    
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-70 text-[#043c74]">Notes (Optional)</span>
                      <textarea rows={1} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full resize-none border-b border-gray-300 bg-transparent py-1.5 text-sm text-[#043c74] outline-none transition-colors focus:border-[#043c74]" />
                    </label>

                    {message && <p role="alert" className="mt-2 text-sm font-bold text-red-500">{message}</p>}

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs font-medium text-[#043c74]/70">
                        {dateLabel(selectedDate)} at {selectedSlot && formatSlot(Number(selectedSlot.split(":")[0]) * 60 + Number(selectedSlot.split(":")[1]))}
                      </p>
                      <button 
                        disabled={isPending} 
                        className="w-full sm:w-auto rounded-full bg-[#043c74] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100"
                      >
                        {isPending ? "Confirming..." : "Confirm Booking"}
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            )}
          </div>

          {/* SIDEBAR: Upcoming Workshops */}
          <div className="w-full lg:w-1/3 space-y-4">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#fecbd7] mb-6">
              Upcoming Workshops
            </h3>
            
            <div className="flex flex-col gap-4">
              {UPCOMING_WORKSHOPS.map((workshop, idx) => (
                <div key={idx} className="group flex gap-4 bg-white p-3 rounded-2xl shadow-sm transition-transform hover:scale-[1.02]">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image src={workshop.image} alt={workshop.title} fill className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-display font-bold text-[#043c74] leading-tight text-sm">{workshop.title}</h4>
                    <p className="text-[10px] font-semibold text-[#043c74]/60 mt-1">{workshop.date}</p>
                    <p className="text-[10px] text-[#043c74]/50">{workshop.time}</p>
                    {workshop.spots === 0 ? (
                      <span className="mt-1.5 text-[9px] uppercase font-bold text-red-500 tracking-widest">Fully Booked</span>
                    ) : (
                      <span className="mt-1.5 text-[9px] uppercase font-bold text-[#043c74] tracking-widest">{workshop.spots} Spots Left</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 rounded-2xl bg-[#fecbd7] p-6 text-[#043c74]">
              <h4 className="font-display text-lg font-bold uppercase leading-tight mb-2">Want to host a private event?</h4>
              <p className="text-xs opacity-80 mb-4">Gather your friends for an exclusive jewelry crafting experience.</p>
              <button className="w-full rounded-full border-2 border-[#043c74] py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-[#043c74] hover:text-[#fecbd7]">
                Inquire Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
