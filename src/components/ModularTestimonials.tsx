"use client";

import { useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "We fell in love with Studio Memento’s private charm session. It felt less like shopping and more like finding tiny gold reminders of our journey together. My permanent bracelet has not left my wrist for two years.",
    author: "Karim & Aurelie",
    role: "Bespoke Charm & Permanent Link Clients",
    cardBg: "bg-[#1B4083]",
    textColor: "text-white",
    quoteColor: "text-[#FFC8D4]",
  },
  {
    quote:
      "I brought in my grandmother’s vintage ring, completely unsure if it could be modernized. Studio Memento reimagined the sapphire into an architectural bezel pendant that I now wear every single day.",
    author: "Tara Sharma",
    role: "Heirloom Redesign Client",
    cardBg: "bg-white",
    textColor: "text-[#1B4083]",
    quoteColor: "text-[#FFC8D4]",
  },
  {
    quote:
      "The Soleil Pearl Drop earrings were the centerpiece of my wedding day. The luster of the baroque pearls and the matte finish of the gold were breathtaking in every photograph.",
    author: "Aditi Rao",
    role: "Bridal Commission",
    cardBg: "bg-[#FFF0EB]",
    textColor: "text-[#1B4083]",
    quoteColor: "text-[#1B4083]",
  },
];

export default function ModularTestimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 sm:py-36 text-[#1B4083]">
      <div className="container-modular max-w-7xl">
        {/* Intro */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block rounded-full bg-[#FFC8D4] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#1B4083] mb-4">
            Client Words
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B4083]">
            Stories worn close to the heart.
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className={`rounded-[2.25rem] p-8 sm:p-10 flex flex-col justify-between shadow-lg border border-[#1B4083]/10 transition-transform duration-300 hover:-translate-y-1.5 ${item.cardBg} ${item.textColor}`}
            >
              <div>
                {/* Oversized Studio Modular Style Quotation Marks */}
                <div className={`font-serif text-6xl leading-none mb-6 ${item.quoteColor}`}>
                  “
                </div>
                <p className="text-base sm:text-lg leading-relaxed opacity-90">
                  {item.quote}
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-current/15">
                <p className="font-display text-lg font-bold tracking-tight">
                  {item.author}
                </p>
                <p className="text-xs uppercase tracking-wider opacity-70 mt-1">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
