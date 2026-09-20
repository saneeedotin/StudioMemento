"use client";

import Link from "next/link";
import Image from "next/image";
import { useMenu } from "./MenuContext";

interface SubpageNavProps {
  theme: "dark" | "light"; // "dark" = dark background (needs light text), "light" = light background (needs dark text)
}

export default function SubpageNav({ theme }: SubpageNavProps) {
  const { isMenuOpen, toggleMenu } = useMenu();

  const textColor = theme === "dark" ? "text-[#FAF6F0]" : "text-[#1B4083]";
  
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
        <div className="hidden lg:flex items-center gap-12 text-[1.05rem] font-medium tracking-wide absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <a href="https://studiomemento.in/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Collection</a>
          <Link href="/gallery" className="hover:opacity-70 transition-opacity">Gallery</Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
        </div>
        
        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-3 z-[10000] shrink-0">
          <Link
            href="/appointment"
            className={`hidden sm:flex h-[3.2rem] items-center rounded-full px-8 text-[15px] font-medium tracking-wide shadow-md transition-all duration-300 ${
              theme === "dark" 
                ? "bg-[#FAF6F0] text-[#1A4083] hover:bg-white" 
                : "bg-[#1B4083] text-white hover:bg-[#0F2753]"
            }`}
          >
            Book an appointment
          </Link>
        </div>

        {/* Mobile Menu Button (Matches Homepage Menu Pill) */}
        <button 
          type="button" 
          aria-label="Toggle Menu" 
          onClick={toggleMenu} 
          className={`flex lg:hidden h-[2.6rem] px-4 items-center justify-center rounded-full border-2 ${theme === 'dark' ? 'border-[#FAF6F0] text-[#FAF6F0] hover:bg-white/10' : 'border-[#1B4083] text-[#1B4083] bg-white/50 hover:bg-white'} transition-all active:scale-95 z-[10000] shadow-xs backdrop-blur-md`}
        >
          {isMenuOpen ? (
            <><svg className="h-[17px] w-[17px] mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg><span className="text-[13.5px] font-medium tracking-wide">Menu</span></>
          ) : (
            <><span className="text-[13.5px] font-medium tracking-wide mr-2">Menu</span><svg className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg></>
          )}
        </button>
      </nav>
    </>
  );
}
