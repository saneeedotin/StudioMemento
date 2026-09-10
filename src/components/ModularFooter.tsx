"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SITE } from "@/lib/site";

export default function ModularFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for the dark navy footer area
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start 80%", "end end"] 
  });

  // Typography animation values
  const titleY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 1]);
  const titleRotate = useTransform(scrollYProgress, [0, 1], [15, 0]);

  return (
    <footer id="contact" className="relative pt-12 text-[#1B4083]">
      <div className="container-modular max-w-7xl pb-8">
        {/* Large Rounded CTA Banner Card (Inspired by Studio Modular CTA Banner) */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#FFC8D4] p-8 sm:p-12 lg:p-16 mb-20 shadow-xl border border-[#1B4083]/10">
          {/* Decorative Background Curved Shapes */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-25 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute right-[-10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-white/50" />
            <div className="absolute right-[20%] bottom-[-20%] h-[20rem] w-[20rem] rounded-full bg-[#1B4083]/10" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image in Soft Rounded Frame */}
            <div className="lg:col-span-4">
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-[2rem] bg-white/40 shadow-md">
                <Image
                  src="/images/necklace.png"
                  alt="Client enjoying Studio Memento jewellery"
                  fill
                  sizes="(max-width: 1024px) 80vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Text & CTA Button */}
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1B4083] leading-[1.15]">
                Ready to romanticize your becoming and wear your own story?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#1B4083]/85 max-w-xl">
                Book a private styling consultation or visit our charm bar in person. Let us craft a piece that holds your memories forever.
              </p>

              <div className="mt-8 flex items-center gap-2">
                <Link
                  href="/appointment"
                  className="rounded-full bg-[#1B4083] px-8 py-3.5 text-base font-semibold tracking-tight text-white shadow-md transition-all duration-300 hover:bg-[#0F2753] hover:scale-105"
                >
                  Book an Appointment
                </Link>
                <Link
                  href="/appointment"
                  aria-label="Book appointment"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1B4083] transition-all duration-300 hover:scale-105 hover:bg-[#FAF6F0]"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Navy Grand Footer */}
      <div 
        ref={footerRef}
        className="relative rounded-t-[3rem] bg-[#1B4083] text-white pt-16 mt-8 overflow-hidden z-10 flex flex-col w-full max-w-full"
      >
        <div className="container-modular px-6 sm:px-12 lg:px-16">
          {/* Service Pillar Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pb-14 border-b border-white/15">
            {[
              { name: "Bespoke Design", icon: "✿" },
              { name: "The Charm Bar", icon: "✺" },
              { name: "Permanent Links", icon: "⬡" },
              { name: "Heirloom Redesign", icon: "✦" },
              { name: "Ethical Gemstones", icon: "◆" },
            ].map((col, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="font-display text-sm sm:text-base font-bold tracking-tight">
                  {col.name}
                </span>
                <span className="text-sm opacity-60">{col.icon}</span>
              </div>
            ))}
          </div>

          {/* Footer Main Links & Studio Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-14 pb-12">
            {/* Left: Studio Music Track */}
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest font-mono text-[#FFC8D4] block mb-2">
                In our atelier we are currently listening to
              </span>
              <p className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span>Leon Bridges • Texas Sun</span>
                <span className="text-xs">↗</span>
              </p>
              <p className="mt-8 text-xs leading-relaxed text-white/60 max-w-sm">
                Studio Memento is an intimate jewellery atelier celebrating personal journeys, heirloom stories, and timeless craftsmanship.
              </p>
            </div>

            {/* Middle: Navigation Links */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-[#FFC8D4] block mb-4">
                  Navigation
                </span>
                <ul className="space-y-2.5 text-sm font-medium text-white/80">
                  <li><a href="#about" className="hover:text-[#FFC8D4] transition-colors">About Us</a></li>
                  <li><a href="#collection" className="hover:text-[#FFC8D4] transition-colors">Curated Collection</a></li>
                  <li><a href="#craft" className="hover:text-[#FFC8D4] transition-colors">Our Craft</a></li>
                  <li><a href="/appointment" className="hover:text-[#FFC8D4] transition-colors">Book a Slot</a></li>
                </ul>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-[#FFC8D4] block mb-4">
                  Legal
                </span>
                <ul className="space-y-2.5 text-sm font-medium text-white/80">
                  <li><Link href="/" className="hover:text-[#FFC8D4] transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/" className="hover:text-[#FFC8D4] transition-colors">Terms of Service</Link></li>
                  <li><Link href="/" className="hover:text-[#FFC8D4] transition-colors">Care Instructions</Link></li>
                </ul>
              </div>
            </div>

            {/* Right: Contact & Location */}
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest font-mono text-[#FFC8D4] block mb-4">
                Private Consultations
              </span>
              <p className="font-display text-lg font-bold text-white mb-1">
                <a href={`mailto:${SITE.email}`} className="hover:underline">
                  {SITE.email}
                </a>
              </p>
              <p className="text-sm text-white/80 mb-6">
                <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#FFC8D4] transition-colors hover:underline">
                  {SITE.addressLine1}, {SITE.addressLine2}
                </a>
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 px-4 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white hover:bg-[#FFC8D4] hover:text-[#1B4083] transition-colors"
                >
                  Instagram
                </a>
                {["Pinterest", "WhatsApp"].map((social) => (
                  <Link
                    href="/"
                    key={social}
                    className="flex h-10 px-4 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white hover:bg-[#FFC8D4] hover:text-[#1B4083] transition-colors cursor-pointer"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Footer Design Massive Typography Reveal */}
        <div 
          className="relative mt-auto w-full pt-10 sm:pt-20 pb-4 overflow-hidden flex flex-col items-center justify-end" 
          style={{ perspective: "1000px" }}
        >
          <motion.div 
            style={{ y: titleY, opacity: titleOpacity, rotateX: titleRotate }}
            className="w-full text-center px-4 origin-bottom"
          >
            <h1 
              className="font-display text-[13.5vw] sm:text-[15.5vw] leading-[0.75] font-black tracking-tighter text-white uppercase"
            >
              MEMENTO
            </h1>
          </motion.div>
          
          {/* Bottom Copyright & Wordmark */}
          <div className="w-full px-6 sm:px-12 lg:px-16 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 border-t border-white/10 pt-6">
            <p>© {new Date().getFullYear()} Studio Memento. All rights reserved.</p>
            <p className="font-mono text-[#FFC8D4]">Designed with intentional elegance.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
