"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function ModularHero() {
  const rootRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLHeadingElement>(null);
  const mementoRef = useRef<HTMLHeadingElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const studioChars = ["S", "t", "u", "d", "i", "o"];
  const mementoChars = ["M", "e", "m", "e", "n", "t", "o"];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.2,
      });

      tl.from(".hero-header", { opacity: 0, y: -20, duration: 0.8 })
        // Studio architectural character stagger (clean, upright, no slant/tilt)
        .from(".studio-char", {
          opacity: 0,
          y: 60,
          duration: 1.0,
          stagger: 0.04,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }, "-=0.5")
        // Floating cards emerge
        .from(leftCardRef.current, { opacity: 0, scale: 0.85, y: 30, duration: 0.9, ease: "back.out(1.4)" }, "-=0.7")
        .from(rightCardRef.current, { opacity: 0, scale: 0.85, y: -30, duration: 0.9, ease: "back.out(1.4)" }, "-=0.8")
        // Memento character stagger (clean, upright, no slant/tilt, identical timing)
        .from(".memento-char", {
          opacity: 0,
          y: 60,
          duration: 1.0,
          stagger: 0.04,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }, "-=0.8")
        .from(".hero-tagline", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");

      // Floating ambient motion for cards
      gsap.set(leftCardRef.current, { rotation: -12 });
      gsap.to(leftCardRef.current, {
        y: -15,
        rotation: -16,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.set(rightCardRef.current, { rotation: 5 });
      gsap.to(rightCardRef.current, {
        y: 15,
        rotation: 10,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });

      // Subtle ambient breathing for Memento (Foreground depth layer)
      gsap.to(mementoRef.current, {
        y: 8,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });

      // Subtle ambient counter-drift for Studio (Background depth layer)
      gsap.to(studioRef.current, {
        y: -6,
        duration: 6.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    // Mouse parallax tracking with 4 distinct depth planes (Concept 3)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      // Layer 1 (Deepest): Studio (mild counter-drift)
      gsap.to(studioRef.current, {
        x: -xNorm * 10,
        y: -yNorm * 8,
        duration: 1.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Layer 2 (Mid-ground): Right Heart Earring Card
      gsap.to(rightCardRef.current, {
        x: -xNorm * 18,
        y: -yNorm * 16,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Layer 3 (Foreground Typography): Memento (moves forward with mouse)
      gsap.to(mementoRef.current, {
        x: xNorm * 12,
        y: yNorm * 10,
        duration: 1.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Layer 4 (Extreme Foreground): Left Slanted Necklace Card (glides over M of Memento)
      gsap.to(leftCardRef.current, {
        x: xNorm * 24,
        y: yNorm * 22,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[90vh] sm:min-h-screen w-full text-[#1B4083] flex flex-col pb-16"
    >
      {/* SVG Defs for organic shapes */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="uneven-heart" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.25 C 0.35 0.0, 0.1 0.05, 0.05 0.25 C -0.05 0.5, 0.3 0.8, 0.5 0.98 C 0.8 0.75, 1.05 0.45, 0.95 0.2 C 0.85 0.0, 0.6 0.05, 0.5 0.25 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Top Header Navigation */}
      <header className="hero-header relative z-[10000] flex w-full items-center justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-16 lg:py-10 max-w-full">
        {/* Logo */}
        <Link href="/" className="inline-block transition-opacity hover:opacity-85 z-[10000] shrink-0" aria-label="Studio Memento Home">
          <Image
            src="/images/logo_1.png"
            alt="studio memento"
            width={180}
            height={70}
            priority
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-14 text-[1.05rem] font-medium tracking-wide text-[#1B4083] z-[10000]">
          <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <a href="https://studiomemento.in/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Collection</a>
          <Link href="/gallery" className="hover:opacity-70 transition-opacity">Gallery</Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
        </nav>

        {/* Right CTA & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 z-[10000] shrink-0">
          
          {/* Desktop CTA (Hidden on Mobile) */}
          <Link
            href="/appointment"
            className="hidden sm:flex h-[3.2rem] items-center rounded-full bg-[#1B4083] px-8 text-[15px] font-medium tracking-wide text-white shadow-md transition-all duration-300 hover:bg-[#0F2753]"
          >
            Book your Slot!!
          </Link>
          <Link
            href="/appointment"
            aria-label="Book appointment slot"
            className="hidden sm:flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full bg-[#FFC5D3] text-[#1B4083] transition-all duration-300 hover:bg-[#ffb0c2]"
          >
            <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* Mobile Menu Button (Hidden on Desktop) */}
          <button 
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex lg:hidden h-[2.8rem] px-5 items-center justify-center rounded-full border-2 border-[#1B4083]/20 text-[#1B4083] bg-white/30 backdrop-blur-md transition-all active:scale-95 z-[10000]"
          >
            {isMenuOpen ? (
              <>
                <span className="text-[14px] font-medium tracking-wide mr-2">Close</span>
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </>
            ) : (
              <>
                <span className="text-[14px] font-medium tracking-wide mr-2">Menu</span>
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </>
            )}
          </button>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] bg-[#FAF6F0] text-[#1B4083] flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-8 text-2xl font-display font-bold">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <a href="https://studiomemento.in/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Collection</a>
          <Link href="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
        <Link 
          href="/appointment" 
          onClick={() => setIsMenuOpen(false)}
          className="mt-12 border border-[#1B4083] px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-[#1B4083] hover:text-white transition-colors"
        >
          Book an Appointment
        </Link>
      </div>

      {/* Hero Content */}
      <div className="relative z-30 flex-1 w-full px-4 sm:px-8 lg:px-[6%] pt-[4vh] sm:pt-[8vh] flex flex-col max-w-[1920px] mx-auto">
        <div className="relative w-full flex-1 min-h-[660px] sm:min-h-[500px]">
          
          {/* Typography: Editorial Contrast Pairing with 3D Parallax & Staggered Reveal */}
          {/* Studio (Modern Sans: Bricolage Grotesque) */}
          <h1 
            ref={studioRef}
            className="hero-title-text absolute top-0 left-2 sm:left-4 font-display font-bold text-[#1A4083] tracking-[-0.03em] select-none z-10 text-[16vw] sm:text-[clamp(5.2rem,14.5vw,16.5rem)] leading-[0.88] will-change-transform pointer-events-auto whitespace-nowrap"
            aria-label="Studio"
          >
            {studioChars.map((char, index) => (
              <span 
                key={index} 
                className="studio-char inline-block will-change-transform transition-transform duration-300 hover:-translate-y-2 cursor-default"
              >
                {char}
              </span>
            ))}
          </h1>
          
          {/* Memento (Same font as Studio: Bricolage Grotesque, identical size & weight) */}
          <h1 
            ref={mementoRef}
            className="hero-title-text absolute top-[66px] sm:top-[42%] right-2 sm:right-auto sm:left-[23%] lg:left-[24%] font-display font-bold text-[#1A4083] tracking-[-0.03em] select-none z-30 text-[16vw] sm:text-[clamp(5.2rem,14.5vw,16.5rem)] leading-[0.88] will-change-transform pointer-events-auto text-right sm:text-left whitespace-nowrap"
            aria-label="Memento"
          >
            {mementoChars.map((char, index) => (
              <span 
                key={index} 
                className="memento-char inline-block will-change-transform transition-transform duration-300 hover:-translate-y-2 cursor-default"
              >
                {char}
              </span>
            ))}
          </h1>

          {/* --- DESKTOP FLOATING IMAGES (Hidden on Mobile) --- */}
          {/* Right Uneven Heart Card (Earrings) - Sticking out to the right */}
          <div
            ref={rightCardRef}
            className="hidden sm:block absolute top-[6%] right-[3%] z-20 w-[26vw] min-w-[200px] max-w-[360px] aspect-square drop-shadow-2xl"
          >
            {/* The Clipped Image */}
            <div className="relative w-full h-full overflow-hidden" style={{ clipPath: "url(#uneven-heart)" }}>
              <Image
                src="/images/earrings.png"
                alt="Statement Gold Drop Earrings"
                fill
                priority
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover object-center scale-[1.15]"
              />
            </div>

            {/* The Outline Stroke */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 1 1" 
              preserveAspectRatio="none"
            >
              <path 
                d="M 0.5 0.25 C 0.35 0.0, 0.1 0.05, 0.05 0.25 C -0.05 0.5, 0.3 0.8, 0.5 0.98 C 0.8 0.75, 1.05 0.45, 0.95 0.2 C 0.85 0.0, 0.6 0.05, 0.5 0.25 Z" 
                fill="none" 
                stroke="#FFC5D3" 
                strokeWidth="0.015" 
              />
            </svg>
          </div>

          {/* Left Slanted Square Card (Necklace) - Positioned to the left of M of Memento */}
          <div
            ref={leftCardRef}
            className="hidden sm:block absolute top-[52%] left-[1%] sm:left-[1%] lg:left-[2%] z-20 w-[18vw] min-w-[160px] max-w-[250px] aspect-square rounded-[2rem] overflow-hidden border-[8px] border-[#FFC5D3] shadow-2xl"
          >
            <Image
              src="/images/necklace.png"
              alt="Turquoise Sun Pendant Necklace"
              fill
              priority
              sizes="(max-width: 768px) 40vw, 25vw"
              className="object-cover object-center scale-[1.1]"
            />
          </div>

          {/* --- MOBILE STATIC IMAGES (Hidden on Desktop) --- */}
          <div className="absolute top-[180px] left-0 w-full h-[280px] flex sm:hidden flex-row items-center justify-center z-20 px-3">
            
            {/* The Golden Chain SVG (Placed behind the images) */}
            <svg 
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden" 
              viewBox="0 0 400 280"
            >
              {/* Continuous chain draped behind the images */}
              <path 
                d="M -20,25 Q 200,250 420,25" 
                fill="none" 
                stroke="#C5A059" 
                strokeWidth="4.5" 
                strokeDasharray="2,7" 
                strokeLinecap="round" 
              />
            </svg>

            {/* Enlarged Centered Heart Earring Card */}
            <div className="hero-title-text relative w-[52vw] max-w-[205px] aspect-square drop-shadow-2xl z-30">
              <div className="relative w-full h-full overflow-hidden" style={{ clipPath: "url(#uneven-heart)" }}>
                <Image
                  src="/images/earrings.png"
                  alt="Statement Gold Drop Earrings"
                  fill
                  sizes="60vw"
                  className="object-cover object-center scale-[1.15]"
                />
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1 1" preserveAspectRatio="none">
                <path d="M 0.5 0.25 C 0.35 0.0, 0.1 0.05, 0.05 0.25 C -0.05 0.5, 0.3 0.8, 0.5 0.98 C 0.8 0.75, 1.05 0.45, 0.95 0.2 C 0.85 0.0, 0.6 0.05, 0.5 0.25 Z" fill="none" stroke="#FFC5D3" strokeWidth="0.02" />
              </svg>
            </div>
            
            {/* Enlarged Slanted Square Necklace Card */}
            <div className="hero-title-text relative w-[46vw] max-w-[175px] aspect-square rounded-[1.8rem] overflow-hidden border-[5px] border-[#FFC5D3] shadow-2xl transform rotate-[-8deg] mt-16 -ml-5 z-20">
              <Image
                src="/images/necklace.png"
                alt="Turquoise Sun Pendant Necklace"
                fill
                sizes="60vw"
                className="object-cover object-center scale-[1.1]"
              />
            </div>
          </div>

          {/* Bottom Right Tagline */}
          <div className="hero-tagline absolute bottom-[78px] sm:bottom-[-5%] right-4 sm:right-[10%] text-right sm:text-left z-40">
            <p className="font-display text-[1.1rem] sm:text-[1.4rem] md:text-[1.7rem] font-semibold tracking-tight text-[#1a4182] leading-tight">
              Romanticize Your Becoming
            </p>
            <p className="mt-1 sm:mt-2 text-xs sm:text-base md:text-[1.1rem] font-serif italic font-normal text-[#1a4182]/80">
              Start your own story
            </p>
          </div>

          {/* Mobile Bottom Dual Action Buttons (Side-by-Side) */}
          <div className="absolute bottom-2 left-0 w-full flex sm:hidden items-center justify-center gap-2.5 z-50 px-3">
            {/* Primary Button */}
            <Link
              href="/appointment"
              className="flex-1 h-[3.2rem] flex items-center justify-center rounded-full bg-[#1B4083] px-2 text-[13.5px] font-semibold tracking-tight text-white shadow-xl transition-all duration-300 active:scale-95 text-center"
            >
              Book an appointment
            </Link>

            {/* Secondary Button */}
            <a
              href="#collection"
              className="flex-1 h-[3.2rem] flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border-2 border-[#1B4083]/20 px-2 text-[13.5px] font-semibold tracking-tight text-[#1B4083] shadow-md transition-all duration-300 active:scale-95 text-center"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
