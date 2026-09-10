"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { bookAppointment, getAvailability, getBookingWindow } from "@/app/actions";
import type { Slot } from "@/lib/booking";
import { formatSlot } from "@/lib/site";
import SubpageNav from "@/components/SubpageNav";

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
    <div className="flex-1 bg-[#1A4083] text-[#FAF6F0] min-h-screen relative overflow-hidden pb-20">
      <SubpageNav theme="dark" />

      {/* Hero / Booking Section */}
      <section className="relative pt-32 sm:pt-48 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-x-16 lg:gap-x-24 gap-y-16">
        
        {/* Heading & Text (Top Left on Desktop, Top on Mobile) */}
        <div className="z-10 lg:col-start-1 lg:row-start-1 lg:max-w-xl">
          <span className="text-[#FFC8D4] font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 block border border-[#FFC8D4]/30 inline-block px-4 py-1.5 rounded-full w-fit">
            Private Sessions
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-8 leading-[0.9]">
            Book your <br />
            <span className="text-[#FFC8D4] italic font-light tracking-tight">consultation.</span>
          </h1>
          <p className="text-lg sm:text-xl opacity-80 leading-relaxed lg:mb-8">
            Choose a day, find your half hour, and we will have your stories waiting. Our studio doors are open for bespoke design, heirloom resets, and styling.
          </p>
        </div>

        {/* Right: The Booking Card (Right on Desktop, Middle on Mobile) */}
        <div className="z-10 w-full max-w-2xl lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="bg-[#FAF6F0] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl text-[#1B4083]">
            {success ? (
              <div className="text-center py-10">
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">You are on the list</span>
                <h3 className="mt-4 font-display text-4xl font-bold uppercase text-[#1B4083]">See you soon.</h3>
                <p className="mt-6 text-lg leading-relaxed opacity-80">
                  Your styling consultation is held for <strong>{dateLabel(selectedDate)}</strong> at <strong>{formatSlot(Number(selectedSlot.split(":")[0]) * 60 + Number(selectedSlot.split(":")[1]))}</strong>.
                </p>
                <button 
                  type="button" 
                  onClick={() => { setSuccess(false); setSelectedSlot(""); void refresh(selectedDate); }} 
                  className="mt-10 rounded-full border border-[#1B4083] px-8 py-3 text-xs uppercase font-bold tracking-widest transition-colors hover:bg-[#1B4083] hover:text-white"
                >
                  Book another time
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-3xl font-bold mb-2">Select a Time</h3>
                <p className="opacity-70 mb-8 text-sm">We typically respond to bespoke inquiries within 48 hours.</p>

                {/* Side-by-Side Calendar & Time */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                  
                  {/* Left: Proper Calendar */}
                  <div className="w-full sm:w-[55%]">
                    {(() => {
                      const displayDate = selectedDate ? new Date(`${selectedDate}T12:00:00`) : new Date();
                      const year = displayDate.getFullYear();
                      const month = displayDate.getMonth();
                      
                      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(displayDate);
                      const daysInMonth = new Date(year, month + 1, 0).getDate();
                      const firstDayOfMonth = new Date(year, month, 1).getDay();
                      const startingBlanks = (firstDayOfMonth + 6) % 7;
                      
                      const blanks = Array.from({ length: startingBlanks }).fill(null);
                      const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
                        const d = i + 1;
                        return `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                      });
                      const allCells = [...blanks, ...monthDays];

                      return (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-[11px] font-bold uppercase tracking-widest opacity-60">{monthName}</p>
                            <span className="rounded-full border border-[#1B4083]/20 px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest">IST</span>
                          </div>
                          
                          {/* Days of Week */}
                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                              <div key={day} className="text-center text-[10px] font-bold opacity-50">
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Grid */}
                          <div className="grid grid-cols-7 gap-1">
                            {allCells.map((dateStr, i) => {
                              if (!dateStr) return <div key={`blank-${i}`} className="w-full aspect-square" />;
                              const isAvailable = dates.includes(dateStr as string);
                              const isSelected = selectedDate === dateStr;
                              const dayNum = Number((dateStr as string).split("-")[2]);

                              return (
                                <button 
                                  key={dateStr as string}
                                  type="button"
                                  disabled={!isAvailable}
                                  onClick={() => { setSelectedDate(dateStr as string); setMessage(""); setSelectedSlot(""); }}
                                  className={`w-full aspect-square max-w-[2.5rem] mx-auto rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                                    isSelected 
                                      ? "bg-[#1B4083] text-white shadow-md" 
                                      : isAvailable 
                                        ? "bg-transparent text-[#1B4083] hover:bg-[#1B4083]/10" 
                                        : "text-[#1B4083]/20 cursor-not-allowed"
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
                  <div className="w-full sm:w-[45%]">
                    <div className="flex items-center justify-between mb-4 mt-6 sm:mt-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest opacity-60">Availability</p>
                    </div>

                    {!selectedDate ? (
                      <div className="h-40 flex items-center justify-center border border-dashed border-[#1B4083]/20 rounded-2xl">
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Select date</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {slots.map((slot) => (
                          <button 
                            key={slot.value} 
                            type="button" 
                            disabled={!slot.available} 
                            onClick={() => setSelectedSlot(slot.value)} 
                            className={`rounded-xl border py-2 flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                              !slot.available 
                                ? "cursor-not-allowed border-transparent bg-[#1B4083]/5 text-[#1B4083]/30 line-through" 
                                : selectedSlot === slot.value 
                                  ? "border-[#1B4083] bg-[#1B4083] text-white shadow-md" 
                                  : "border-[#1B4083]/10 bg-transparent text-[#1B4083] hover:border-[#1B4083]/30 hover:bg-[#1B4083]/5"
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Form (Appears below when a time is selected) */}
                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${selectedSlot ? "max-h-[1000px] opacity-100 mt-10 pt-8 border-t border-[#1B4083]/10" : "max-h-0 opacity-0 mt-0 pt-0 border-t-0"}`}>
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold">Your Details</h3>
                  </div>

                  <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">Name *</label>
                        <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all" placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">Phone *</label>
                        <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all" placeholder="jane@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-60 ml-2">Notes / Vision</label>
                      <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full bg-[#1A4083]/5 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#1B4083]/20 outline-none transition-all resize-none" placeholder="Tell us what you have in mind..." />
                    </div>

                    {message && <p role="alert" className="mt-2 text-sm font-bold text-red-500">{message}</p>}

                    <div className="pt-2 flex flex-col items-start gap-4">
                      <p className="text-xs font-bold text-[#1B4083]/70 font-mono tracking-wider">
                        {dateLabel(selectedDate)} @ {selectedSlot && formatSlot(Number(selectedSlot.split(":")[0]) * 60 + Number(selectedSlot.split(":")[1]))}
                      </p>
                      <button 
                        disabled={isPending} 
                        className="w-full bg-[#1B4083] text-white rounded-full py-5 font-bold tracking-wider uppercase text-sm hover:bg-[#0F2753] transition-colors disabled:opacity-60"
                      >
                        {isPending ? "Confirming..." : "Confirm Booking"}
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Workshops (Bottom Left on Desktop, Bottom on Mobile) */}
        <div className="z-10 space-y-6 lg:col-start-1 lg:row-start-2 lg:max-w-xl">
          <p className="uppercase tracking-[0.2em] opacity-60 text-xs mb-6 font-mono">Upcoming Workshops</p>
          <div className="flex flex-col gap-4">
            {UPCOMING_WORKSHOPS.map((workshop, idx) => (
              <div key={idx} className="group flex items-center gap-5 border-b border-white/10 pb-4 transition-transform hover:translate-x-2">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-white/20">
                  <Image src={workshop.image} alt={workshop.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-display font-bold text-[#FAF6F0] leading-tight text-lg">{workshop.title}</h4>
                  <p className="text-[11px] opacity-70 font-mono mt-1 uppercase tracking-wider">{workshop.date} • {workshop.time}</p>
                  {workshop.spots === 0 ? (
                    <span className="mt-1 text-[10px] uppercase font-bold text-red-400 tracking-widest">Fully Booked</span>
                  ) : (
                    <span className="mt-1 text-[10px] uppercase font-bold text-[#FFC8D4] tracking-widest">{workshop.spots} Spots Left</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
