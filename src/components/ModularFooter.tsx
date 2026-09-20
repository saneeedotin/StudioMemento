"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/lib/site";

export default function ModularFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [popupImage, setPopupImage] = useState<string | null>(null);

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
                Book a private styling consultation or walk into our charm bar. Let us craft a memento that holds your memories forever.
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

      {/* Cassette Tape Footer */}
      <div 
        ref={footerRef}
        className="relative bg-[#FAF6F0] pt-12 pb-4 mt-8 z-10 flex flex-col w-full max-w-full items-center justify-end overflow-hidden"
      >
        <div className="w-full max-w-[98vw] px-1 sm:px-2 flex flex-col items-center">
          
          {/* Outer Cassette Shell (3:4 on mobile, Ultrawide on desktop) */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[2/1] md:aspect-[2.2/1] bg-[#1B4083] rounded-2xl sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border-b-[8px] border-r-[8px] border-t-2 border-l-2 border-[#0F2753]">
            
            {/* Subtle inner plastic ridges */}
            <div className="absolute top-3 left-3 right-3 bottom-3 border-2 border-white/5 rounded-xl sm:rounded-[2.5rem] pointer-events-none" />
            
            {/* Top Screws */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#0F2753] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
              <div className="w-3/4 h-[1px] bg-white/20 rotate-45"></div>
            </div>
            <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#0F2753] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
              <div className="w-3/4 h-[1px] bg-white/20 -rotate-12"></div>
            </div>

            {/* Central Cassette Label */}
            <div className="absolute top-[12%] left-[8%] right-[8%] bottom-[20%] bg-[#FAF6F0] rounded-xl sm:rounded-2xl shadow-md border-2 border-white/40 overflow-hidden flex flex-col justify-between p-4 sm:p-8">
              
              {/* Background Image for the Label */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" 
                style={{ 
                  backgroundImage: 'url(/whats-your-story-bg-transparent.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }} 
              />
              
              {/* Subtle paper texture/gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent pointer-events-none"></div>

              {/* Label Header */}
              <div className="relative flex justify-between items-center w-full border-b-2 border-[#1B4083]/15 pb-2">
                <div className="flex gap-2 items-center">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="font-mono text-[9px] sm:text-[11px] uppercase font-bold tracking-[0.2em] text-[#1B4083]/60">A Side</span>
                </div>
                <div className="font-mono text-[9px] sm:text-[11px] uppercase font-bold tracking-[0.2em] text-[#1B4083]/60">
                  High Fidelity · Stereo
                </div>
              </div>

              {/* Left Info: Location */}
              <a 
                href="https://maps.google.com/?q=Studio+Memento+Dombivli" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute left-[5%] sm:left-4 md:left-8 top-[65%] sm:top-[45%] -translate-y-1/2 flex flex-col items-start sm:items-center font-[family-name:var(--font-satisfy)] text-[#1B4083] text-xl sm:text-xl md:text-[1.75rem] leading-tight transform-gpu -rotate-2 space-y-1 sm:space-y-4 hover:text-red-500 transition-colors z-20"
              >
                <span>Dombivli,</span>
                <span>Mumbai,</span>
                <span>India</span>
              </a>

              {/* Right Info: Links */}
              <div className="absolute right-[5%] sm:right-4 md:right-8 top-[65%] sm:top-[45%] -translate-y-1/2 flex flex-col items-end sm:items-center font-[family-name:var(--font-satisfy)] text-[#1B4083] text-xl sm:text-xl md:text-[1.75rem] leading-tight transform-gpu -rotate-2 space-y-1 sm:space-y-4 z-20">
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Instagram</a>
                <a href={`mailto:${SITE.email}`} className="hover:text-red-500 transition-colors">Contact Us</a>
                <Link href="/appointment" className="hover:text-red-500 transition-colors">Book a Slot</Link>
              </div>

              {/* Tape Window Area */}
              <div className="absolute sm:relative top-[32%] sm:top-auto left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 w-[90%] sm:w-[60%] h-[24%] sm:h-[40%] bg-[#0F2753] rounded-lg sm:rounded-[1.5rem] sm:mx-auto sm:mt-6 flex items-center justify-between px-4 sm:px-12 overflow-hidden shadow-[inset_0_10px_25px_rgba(0,0,0,0.6)] border border-white/20">
                {/* Magnetic Tape Background */}
                <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #0A1A3A, #0A1A3A 2px, #07122A 2px, #07122A 4px)' }}></div>
                
                {/* Left Reel */}
                <div 
                  className="relative z-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#1B4083] rounded-full border-2 sm:border-4 border-white/20 flex items-center justify-center overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform" 
                  onClick={() => setPopupImage("/images/image.png")}
                >
                  <div className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '10s', animationTimingFunction: 'linear' }}>
                    <Image src="/images/image.png" alt="Memory Reel Left" fill className="object-cover opacity-90" />
                  </div>
                  
                  {/* Spindle hole */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#0F2753] rounded-full border-2 border-white/30 shadow-md z-20 flex items-center justify-center relative">
                    <div className="w-full h-full rounded-full border border-[#1B4083] bg-white/90"></div>
                  </div>
                  
                  {/* Tape wound on the reel */}
                  <div className="absolute inset-0 rounded-full border-[4px] sm:border-[8px] border-black/50 m-[2px] sm:m-1 pointer-events-none z-30"></div>
                </div>

                {/* Right Reel */}
                <div 
                  className="relative z-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#1B4083] rounded-full border-2 sm:border-4 border-white/20 flex items-center justify-center overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform" 
                  onClick={() => setPopupImage("/images/image copy.png")}
                >
                  <div className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '10s', animationTimingFunction: 'linear' }}>
                    <Image src="/images/image copy.png" alt="Memory Reel Right" fill className="object-cover opacity-90" />
                  </div>
                  
                  {/* Spindle hole */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#0F2753] rounded-full border-2 border-white/30 shadow-md z-20 flex items-center justify-center relative">
                    <div className="w-full h-full rounded-full border border-[#1B4083] bg-white/90"></div>
                  </div>
                  
                  {/* Tape wound on the reel */}
                  <div className="absolute inset-0 rounded-full border-[4px] sm:border-[8px] border-black/50 m-[2px] sm:m-1 pointer-events-none z-30"></div>
                </div>
              </div>

              {/* Title & Navigation Area */}
              <div className="relative w-full flex-grow flex justify-between items-end mt-4 pb-2 z-10">
                
                {/* Left Pages */}
                <div className="w-[30%] hidden sm:block">
                  <span className="font-mono text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-[#1B4083]/40 border-b border-[#1B4083]/10 pb-1 mb-2 block">
                    Pages
                  </span>
                  <ul className="space-y-1 sm:space-y-2 font-[family-name:var(--font-satisfy)] text-[#1B4083] text-sm sm:text-2xl leading-none">
                    <li><Link href="#about" className="hover:text-red-500 transition-colors">About Us</Link></li>
                    <li><Link href="#collection" className="hover:text-red-500 transition-colors">Collection</Link></li>
                  </ul>
                </div>

                {/* Center Main Title */}
                <h1 className="absolute left-1/2 bottom-2 -translate-x-1/2 font-[family-name:var(--font-satisfy)] text-4xl sm:text-6xl md:text-[6rem] leading-[0.8] text-[#1B4083] -rotate-2 transform-gpu text-center whitespace-nowrap">
                  Studio Memento
                </h1>

                {/* Right Legal */}
                <div className="w-[30%] text-right hidden sm:block">
                  <span className="font-mono text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-[#1B4083]/40 border-b border-[#1B4083]/10 pb-1 mb-2 block text-right">
                    Legal
                  </span>
                  <ul className="space-y-1 sm:space-y-2 font-[family-name:var(--font-satisfy)] text-[#1B4083] text-sm sm:text-2xl leading-none flex flex-col items-end">
                    <li><Link href="/terms-and-privacy" className="hover:text-red-500 transition-colors">Terms & Privacy</Link></li>
                    <li><Link href="/care" className="hover:text-red-500 transition-colors">Care</Link></li>
                  </ul>
                </div>

              </div>
              
              {/* Write-in lines */}
              <div className="absolute bottom-[25%] left-[10%] right-[10%] h-[1px] bg-[#1B4083]/10 pointer-events-none"></div>
              <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[1px] bg-[#1B4083]/10 pointer-events-none"></div>
            </div>

            {/* Bottom Tape Head Area (Trapezoid) */}
            <div 
              className="absolute bottom-0 left-[25%] right-[25%] h-[12%] bg-[#0F2753] border-t border-l border-r border-white/10"
              style={{ clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0% 100%)' }}
            >
              <div className="w-full h-full flex items-end pb-2 sm:pb-4 justify-center gap-6 sm:gap-12 opacity-40">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-black shadow-inner"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black shadow-inner"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-black shadow-inner"></div>
              </div>
            </div>

            {/* Bottom Left Contact Info */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 flex flex-col justify-end">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="font-mono text-[8px] sm:text-[10px] text-white/50 hover:text-white uppercase tracking-widest mb-3 transition-colors">
                Instagram
              </a>
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#0F2753] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
                <div className="w-3/4 h-[1px] bg-white/20 rotate-12"></div>
              </div>
            </div>

            {/* Bottom Right Contact Info */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 flex flex-col justify-end items-end">
              <a href={`mailto:${SITE.email}`} className="font-mono text-[8px] sm:text-[10px] text-white/50 hover:text-white uppercase tracking-widest mb-3 transition-colors">
                {SITE.email}
              </a>
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#0F2753] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
                <div className="w-3/4 h-[1px] bg-white/20 -rotate-45"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Image Popup Modal */}
      <AnimatePresence>
        {popupImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setPopupImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-square sm:aspect-auto sm:h-[80vh] bg-transparent rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={popupImage} 
                alt="Popup image" 
                fill 
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
              <button 
                onClick={() => setPopupImage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-md transition-colors z-10"
                aria-label="Close popup"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
