"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface SubpageNavProps {
  theme: "dark" | "light"; // "dark" = dark background (needs light text), "light" = light background (needs dark text)
}

export default function SubpageNav({ theme }: SubpageNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const textColor = theme === "dark" ? "text-[#FAF6F0]" : "text-[#1B4083]";
  const borderColor = theme === "dark" ? "border-[#FAF6F0]" : "border-[#1B4083]";
  const bgHoverColor = theme === "dark" ? "hover:bg-[#FAF6F0]" : "hover:bg-[#1B4083]";
  const textHoverColor = theme === "dark" ? "hover:text-[#1A4083]" : "hover:text-white";
  const mobileBg = theme === "dark" ? "bg-[#1A4083]" : "bg-[#FAF6F0]";
  
  // Use CSS filter to turn the logo white if the theme is dark
  const logoFilter = theme === "dark" ? "brightness(0) invert(1)" : "none";

  return (
    <>
      <nav className={`absolute top-0 left-0 w-full p-6 sm:p-10 z-[10000] flex justify-between items-center ${textColor}`}>
        
        {/* Logo */}
        <Link href="/" className="inline-block transition-opacity hover:opacity-85 z-[10000] shrink-0" aria-label="Studio Memento Home">
          <Image
            src="/images/logo_1.png"
            alt="Studio Memento"
            width={180}
            height={70}
            priority
            className="h-10 sm:h-12 w-auto object-contain"
            style={{ filter: logoFilter }}
          />
        </Link>
        
        {/* Desktop Links - Perfectly centered */}
        <div className="hidden lg:flex items-center gap-14 text-[1.05rem] font-medium tracking-wide absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <a href="https://studiomemento.in/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Collection</a>
          <Link href="/gallery" className="hover:opacity-70 transition-opacity">Gallery</Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
        </div>
        
        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-3 z-[10000] shrink-0">
          <Link
            href="/contact"
            className={`hidden sm:flex h-[3.2rem] items-center rounded-full px-8 text-[15px] font-medium tracking-wide shadow-md transition-all duration-300 ${
              theme === "dark" 
                ? "bg-[#FAF6F0] text-[#1A4083] hover:bg-white" 
                : "bg-[#1B4083] text-white hover:bg-[#0F2753]"
            }`}
          >
            Book an appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden z-[10000] p-2 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] ${mobileBg} ${textColor} flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-8 text-2xl font-display font-bold">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <a href="https://studiomemento.in/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>Collection</a>
          <Link href="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
        <Link 
          href="/contact" 
          onClick={() => setIsOpen(false)}
          className={`mt-12 border ${borderColor} px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold ${bgHoverColor} ${textHoverColor} transition-colors`}
        >
          Book an Appointment
        </Link>
      </div>
    </>
  );
}
