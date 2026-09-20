"use client";

import Link from "next/link";
import { useMenu } from "./MenuContext";

export default function OffCanvasMenu() {
  const { isMenuOpen, toggleMenu } = useMenu();

  return (
    <div 
      className={`fixed inset-0 z-0 bg-[#1B4083] overflow-hidden transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
    >

      {/* Menu Content */}
      <div className="absolute right-0 bottom-0 top-0 w-[65vw] flex flex-col justify-end items-end pr-6 sm:pr-10 pb-12 sm:pb-16 z-10 pointer-events-auto">
        {/* Close Button */}
        <button 
          onClick={toggleMenu}
          className={`flex items-center justify-center w-12 h-6 rounded-full bg-black hover:bg-black/80 transition-all duration-700 ease-out delay-[200ms] mb-4 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          aria-label="Close menu"
        >
          <svg className="w-3.5 h-3.5 text-[#ffc7d8] -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>

        <ul className="flex flex-col gap-3 sm:gap-4 text-[#ffc7d8] font-display font-medium text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none lowercase text-right mb-8">
          <li className={`transition-all duration-700 ease-out delay-[300ms] ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Link href="/" onClick={toggleMenu} className="hover:opacity-70 transition-opacity">home</Link>
          </li>
          <li className={`transition-all duration-700 ease-out delay-[350ms] ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <a href="https://studiomemento.in/" target="_blank" rel="noopener noreferrer" onClick={toggleMenu} className="hover:opacity-70 transition-opacity">collections</a>
          </li>
          <li className={`transition-all duration-700 ease-out delay-[400ms] ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Link href="/gallery" onClick={toggleMenu} className="hover:opacity-70 transition-opacity">gallery</Link>
          </li>

          <li className={`transition-all duration-700 ease-out delay-[450ms] ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Link href="/about" onClick={toggleMenu} className="hover:opacity-70 transition-opacity">about us</Link>
          </li>
          <li className={`transition-all duration-700 ease-out delay-[500ms] ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Link href="/contact" onClick={toggleMenu} className="hover:opacity-70 transition-opacity">contact</Link>
          </li>
          {/* Book Appointment Button (Fades in slightly after links) */}
          <li className={`transition-all duration-700 ease-out delay-[550ms] mt-4 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Link 
              href="/appointment" 
              onClick={toggleMenu}
              className="flex items-center gap-2 bg-[#FAF6F0] text-[#1B4083] px-5 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-white transition-all shadow-lg active:scale-95"
            >
              <span>Book an Appointment</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
