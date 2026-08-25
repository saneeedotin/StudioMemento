"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Studio Memento helped us build towards our next chapter in a way that truly fits our vision. Not with a standard approach, but through a close partnership in strategy, brand and culture. They give energy and propel momentum. They don't work for us, they work alongside us. And that's exactly what a family business like ours needs.",
    name: "Aditi / Sheetal / Munni",
    title: "Owner, Bhagambhag",
    image: "/images/18k_Gold_Plated.png",
  },
  {
    quote: "I came in looking for one pair of earrings and left with a whole new way of seeing my wardrobe. It felt less like shopping and more like finding tiny reminders of myself.",
    name: "Tara Sharma",
    title: "Private Client",
    image: "/images/earrings.png",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="bg-[#fecbd7] py-24 md:py-36 text-[#043c74] transition-colors duration-500">
      <div className="container-x mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#043c74]/70">Our Impact</span>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl lg:text-6xl max-w-4xl">
            We love collaborating with good people, family-owned businesses, and individuals with a story.
          </h2>
        </div>

        {/* Marquee or Logos could go here if needed, but we skip for brevity to focus on the slider */}

        <div className="relative mt-20 overflow-hidden rounded-[2rem] bg-[#fff0eb] p-2 md:p-4 shadow-xl border border-[#043c74]/10">
          <div className="flex flex-col lg:flex-row min-h-[400px]">

            {/* Text Side */}
            <div className="flex flex-1 flex-col justify-between p-8 md:p-12">
              <div>
                <span className="block font-serif text-3xl italic mb-6">/// Studio Memento</span>
                <p className="font-display text-xl md:text-3xl leading-snug">
                  {testimonials[currentIndex].quote}
                </p>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div>
                  <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-sm opacity-80">{testimonials[currentIndex].title}</p>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-4">
                  <button onClick={prev} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#d98236]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={next} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#d98236]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative w-full lg:w-[45%] rounded-[1.5rem] overflow-hidden min-h-[300px] flex items-center justify-center bg-white/10">
              <div className="relative w-full h-full min-h-[300px]">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-contain p-6 transition-opacity duration-500"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
