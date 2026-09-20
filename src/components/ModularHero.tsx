"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToId } from "@/components/SmoothScroll";
import { MobilePolaroidStrip } from "@/components/PolaroidStrip";
import { useMenu } from "@/components/MenuContext";

export default function ModularHero() {
  const containerRef = useRef<HTMLElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const modelLayerRef = useRef<HTMLDivElement>(null);
  const leftBtnRef = useRef<HTMLDivElement>(null);
  const rightBtnRef = useRef<HTMLDivElement>(null);
  
  const [mounted, setMounted] = useState(false);
  const [isHeaderDark, setIsHeaderDark] = useState(false);
  const { isMenuOpen, toggleMenu } = useMenu();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Loading Animation Timeline (Plays on load)
      const loadTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1
      });

      // Header fades in
      loadTl.from(".hero-header", { opacity: 0, y: -20, duration: 0.7 })
        // Text Layer: Smoothly glides up and settles into sharp focus
        .fromTo(
          textLayerRef.current,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          "-=0.4"
        )
        // Model Cutout Layer: Ascends with 3D depth from bottom, settling in front of text
        .fromTo(
          modelLayerRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=1.0"
        )
        // Floating Hearts: Gentle staggered float and scale into position
        .fromTo(
          ".decorative-heart",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.6)" },
          "-=0.6"
        )
        // Subtle ambient glow pulse / scale
        .fromTo(
          ".ambient-glow-orb",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 0.75, duration: 1.5, ease: "power1.out" },
          "-=1.0"
        )
        // Side Action Buttons: Glide in dynamically from screen edges
        .fromTo(
          leftBtnRef.current,
          { x: "-130%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.8"
        )
        .fromTo(
          rightBtnRef.current,
          { x: "130%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.8"
        );

      // 2. Looping Headline Alternator: Perfectly symmetric transitions
      gsap.set(phrase1Ref.current, { y: 0, opacity: 1, pointerEvents: "auto" });
      gsap.set(phrase2Ref.current, { y: 24, opacity: 0, pointerEvents: "none" });

      const loopTl = gsap.timeline({ repeat: -1, delay: 2.5 });

      loopTl
        // 1. Hold Phrase 1 ("made to mean something.")
        .to({}, { duration: 3.5 })
        // 2. Phrase 1 exits upwards
        .to(phrase1Ref.current, { y: -24, opacity: 0, duration: 0.5, ease: "power2.inOut" })
        .set(phrase1Ref.current, { pointerEvents: "none" })
        // 3. Prepare Phrase 2 at bottom & animate in
        .set(phrase2Ref.current, { y: 24, opacity: 0 })
        .to(phrase2Ref.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "<0.08")
        .set(phrase2Ref.current, { pointerEvents: "auto" })
        .to(".heart-pulse", { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1, ease: "back.out(2)" }, "<0.1")
        // 4. Hold Phrase 2 ("Little more you everyday .")
        .to({}, { duration: 3.5 })
        // 5. Phrase 2 exits upwards
        .to(phrase2Ref.current, { y: -24, opacity: 0, duration: 0.5, ease: "power2.inOut" })
        .set(phrase2Ref.current, { pointerEvents: "none" })
        // 6. Prepare Phrase 1 at bottom & animate in
        .set(phrase1Ref.current, { y: 24, opacity: 0 })
        .to(phrase1Ref.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "<0.08")
        .set(phrase1Ref.current, { pointerEvents: "auto" })
        .to(".heart-pulse", { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1, ease: "back.out(2)" }, "<0.1");

      // Header Dark Mode Toggle is now handled by the scroll event listener below

    }, containerRef);

    // Highly reliable scroll listener to detect if the header is over a dark section
    const handleScroll = () => {
      const darkSections = document.querySelectorAll(".dark-section");
      let isCurrentlyDark = false;
      const headerMidpoint = 40; // Approx vertical middle of the header

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // If the section spans across the header midpoint, we are over a dark section
        if (rect.top <= headerMidpoint && rect.bottom >= headerMidpoint) {
          isCurrentlyDark = true;
        }
      });

      setIsHeaderDark(isCurrentlyDark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-transparent flex flex-col items-center justify-start overflow-hidden select-none"
    >
      {/* ===================================================================== */}
      {/* TOP HEADER NAVIGATION                                                   */}
      {/* ===================================================================== */}
      {mounted && (
        <header className={`hero-header fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-5 sm:px-10 lg:px-16 py-4 sm:py-5 lg:py-6 max-w-full bg-transparent pointer-events-none transition-colors duration-500 ${isHeaderDark ? 'text-[#FAF6F0]' : 'text-[#1B4083]'}`}>
          <div className="flex items-center gap-8 lg:gap-12 xl:gap-16 pointer-events-auto">
            <Link href="/" className="w-24 sm:w-28 lg:w-36 min-h-[36px] flex items-center shrink-0 pointer-events-auto">
              <Image src="/images/logo-blue-hd.png" alt="Studio Memento" width={180} height={70} className={`w-full h-auto object-contain transition-all duration-500 ${isHeaderDark ? 'brightness-0 invert' : ''}`} />
            </Link>
            <nav className={`hidden md:flex items-center gap-8 lg:gap-12 xl:gap-14 text-[1.02rem] font-medium tracking-wide z-40 px-6 py-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-500 ${isHeaderDark ? 'bg-white/10 text-white' : 'bg-white/40 text-[#1B4083]'}`}>
              <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
              <a href="https://studiomemento.in/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Collection</a>
              <Link href="/gallery" className="hover:opacity-70 transition-opacity">Gallery</Link>
              <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 z-40 shrink-0 ml-auto pointer-events-auto">
            <button type="button" aria-label="Toggle Menu" onClick={toggleMenu} className={`flex md:hidden h-[2.6rem] px-4 items-center justify-center rounded-full border-2 transition-all duration-500 active:scale-95 z-40 shadow-xs backdrop-blur-md ${isHeaderDark ? 'border-[#FAF6F0] text-[#FAF6F0] bg-white/10 hover:bg-white/20' : 'border-[#1B4083] text-[#1B4083] bg-white/50 hover:bg-white'}`}>
              {isMenuOpen ? (
                <><svg className="h-[17px] w-[17px] mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg><span className="text-[13.5px] font-medium tracking-wide">Menu</span></>
              ) : (
                <><span className="text-[13.5px] font-medium tracking-wide mr-2">Menu</span><svg className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg></>
              )}
            </button>
          </div>
        </header>
      )}

      {/* ============================================================= */}
      {/* CONTINUOUS AMBIENT GLOWS (Transparently merges with page)     */}
      {/* ============================================================= */}
      <div className="ambient-glow-orb absolute -left-20 top-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#FFB1C5]/30 blur-3xl pointer-events-none" />
      <div className="ambient-glow-orb absolute -right-20 top-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#FFA8BE]/30 blur-3xl pointer-events-none" />
      <div className="ambient-glow-orb absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FFB1C5]/15 to-transparent pointer-events-none" />

      {/* ============================================================= */}
      {/* FLOATING DECORATIVE HEARTS                                    */}
      {/* ============================================================= */}
      {/* Far Left White Heart */}
      <div className="decorative-heart absolute left-4 sm:left-8 md:left-12 lg:left-16 top-[46%] -translate-y-1/2 z-10 pointer-events-none filter drop-shadow-[0_4px_16px_rgba(255,255,255,0.95)]">
        <svg className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white fill-current rotate-[-15deg] drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Far Right White Heart */}
      <div className="decorative-heart absolute right-4 sm:right-8 md:right-12 lg:right-16 top-[58%] -translate-y-1/2 z-10 pointer-events-none filter drop-shadow-[0_4px_16px_rgba(255,255,255,0.95)]">
        <svg className="w-10 h-10 sm:w-13 sm:h-13 md:w-15 md:h-15 text-white fill-current rotate-[12deg] drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* ============================================================= */}
      {/* MOBILE POLAROID STRIP (Only visible on md and below)          */}
      {/* ============================================================= */}
      <div className="absolute top-[16vh] xs:top-[18vh] left-0 w-full z-0 md:hidden pointer-events-none">
        <MobilePolaroidStrip />
      </div>

      {/* ============================================================= */}
      {/* 1-1 REPLICA SCENE: TYPOGRAPHY LAYER (z-10: Behind Model)     */}
      {/* ============================================================= */}
      <div
        ref={textLayerRef}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-start pt-[36vh] xs:pt-[39vh] sm:pt-[32vh] md:pt-32 lg:pt-36 text-center px-4"
      >
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* ========================================================= */}
          {/* PHRASE 1: "made to mean something ."                      */}
          {/* ========================================================= */}
          <div
            ref={phrase1Ref}
            className="relative z-10 w-full flex flex-col items-center justify-center text-center will-change-transform select-none opacity-0"
          >
            {/* Top Line */}
            <div className="flex items-baseline justify-center gap-x-2 xs:gap-x-3 sm:gap-x-5 md:gap-x-7 whitespace-nowrap">
              <span className="font-display text-[13.5vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] 2xl:text-[10.5rem] font-semibold sm:font-medium tracking-[-0.035em] text-[#15559D] leading-[0.88] relative">
                made to
                <span className="decorative-heart heart-pulse absolute -top-4 sm:-top-7 md:-top-9 right-1 sm:right-3 md:right-4 text-[#FF8EA1] pointer-events-none filter drop-shadow-sm">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 fill-current rotate-[14deg]" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </span>
              <span
                className="text-[13.5vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] 2xl:text-[10.5rem] font-medium sm:font-normal italic tracking-tight text-[#FF8EA1] leading-[0.88] ml-1 sm:ml-2"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                mean
              </span>
            </div>
            {/* Bottom Line */}
            <div className="relative mt-3 sm:mt-2 md:mt-3 flex items-baseline justify-center whitespace-nowrap">
              <span className="decorative-heart heart-pulse absolute -left-6 sm:-left-12 md:-left-16 lg:-left-20 top-0 sm:top-2 md:top-3 text-[#FF8EA1] pointer-events-none filter drop-shadow-sm">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 fill-current rotate-[-16deg]" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              <span className="font-display text-[15.5vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] 2xl:text-[10.5rem] font-semibold sm:font-medium tracking-[0.015em] text-[#15559D] leading-[0.88] relative">
                something
                <span className="decorative-heart heart-pulse absolute bottom-2 sm:bottom-3 md:bottom-5 lg:bottom-6 -right-6 sm:-right-9 md:-right-12 lg:-right-14 text-[#15559D] pointer-events-none">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 fill-current rotate-[14deg]" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PHRASE 2: "Little more you everyday ."                     */}
          {/* ========================================================= */}
          <div
            ref={phrase2Ref}
            className="absolute inset-0 z-10 w-full flex flex-col items-center justify-center text-center will-change-transform select-none opacity-0 pointer-events-none"
          >
            <div className="flex items-baseline justify-center gap-x-2 xs:gap-x-3 sm:gap-x-4 md:gap-x-6 whitespace-nowrap">
              <span className="font-display text-[13vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] 2xl:text-[10.5rem] font-semibold sm:font-medium tracking-[-0.035em] text-[#15559D] leading-[0.88] relative">
                Little more
                <span className="decorative-heart heart-pulse absolute -top-4 sm:-top-7 md:-top-9 right-1 sm:right-3 md:right-4 text-[#FF8EA1] pointer-events-none filter drop-shadow-sm">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 fill-current rotate-[14deg]" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </span>
              <span
                className="text-[13vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] 2xl:text-[10.5rem] font-medium sm:font-normal italic tracking-tight text-[#FF8EA1] leading-[0.88] ml-1 sm:ml-2"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                you
              </span>
            </div>
            <div className="relative mt-3 sm:mt-2 md:mt-3 flex items-baseline justify-center whitespace-nowrap">
              <span className="decorative-heart heart-pulse absolute -left-6 sm:-left-12 md:-left-16 lg:-left-20 top-0 sm:top-2 md:top-3 text-[#FF8EA1] pointer-events-none filter drop-shadow-sm">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 fill-current rotate-[-16deg]" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              <span className="font-display text-[15.5vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] 2xl:text-[10.5rem] font-semibold sm:font-medium tracking-[0.015em] text-[#15559D] leading-[0.88] relative">
                everyday
                <span className="decorative-heart heart-pulse absolute bottom-2 sm:bottom-3 md:bottom-5 lg:bottom-6 -right-6 sm:-right-9 md:-right-12 lg:-right-14 text-[#15559D] pointer-events-none">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 fill-current rotate-[14deg]" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* FOREGROUND MODEL CUTOUT (z-20: Overlapping on top of text)    */}
      {/* ============================================================= */}
      <div
        ref={modelLayerRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none h-[56vh] xs:h-[58vh] sm:h-[55vh] md:h-[57vh] lg:h-[59vh] max-h-[620px] w-auto aspect-[464/594] opacity-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 96%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 96%)",
        }}
      >
        <Image
          src="/images/model-cutout.png"
          alt="Studio Memento model with handcrafted jewelry"
          fill
          priority
          sizes="(max-width: 768px) 420px, (max-width: 1280px) 520px, 620px"
          className="object-contain object-bottom filter drop-shadow-[0_12px_28px_rgba(21,85,157,0.08)]"
        />
        <span className="decorative-heart absolute left-[2%] sm:left-[4%] bottom-[12%] text-[#FF8EA1] pointer-events-none z-30 filter drop-shadow-sm">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-current rotate-[-18deg]" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-24 sm:h-32 pointer-events-none z-20"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(255, 200, 212, 0.45) 0%, rgba(250, 246, 240, 0.75) 45%, transparent 75%)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* ============================================================= */}
      {/* SIDE ACTION BUTTON 1: "Book your slot!" (Appointment)         */}
      {/* ============================================================= */}
      <div
        ref={leftBtnRef}
        className="absolute left-0 bottom-20 sm:bottom-18 md:bottom-22 lg:bottom-24 z-30 pointer-events-auto select-none opacity-0"
      >
        <Link
          href="/appointment"
          className="group flex items-center gap-2 sm:gap-3.5 pl-3 sm:pl-5 md:pl-7 pr-4 sm:pr-6 md:pr-8 py-2 sm:py-3.5 md:py-4 rounded-r-[1.75rem] bg-[#1B4083] hover:bg-[#0F2753] shadow-[0_8px_24px_rgba(27,64,131,0.25)] hover:shadow-[0_14px_40px_rgba(15,39,83,0.38)] border border-white/20 border-l-0 text-white transition-all duration-300 hover:translate-x-2 active:scale-95 cursor-pointer"
          aria-label="Book your slot! (Appointment)"
        >
          <span className="flex h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/15 text-[#FFC8D4] group-hover:bg-[#FFC8D4] group-hover:text-[#1B4083] group-hover:scale-110 transition-all duration-300 shrink-0 shadow-xs">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 fill-current transition-transform duration-300 group-hover:scale-125" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
          <div className="flex flex-col items-start leading-none">
            <div className="font-display font-medium text-[12px] sm:text-[15px] md:text-[16px] tracking-tight text-white flex items-center gap-1">
              <span>Book your slot!</span>
            </div>
            <span className="text-[9px] sm:text-[10.5px] md:text-[11px] font-sans font-semibold text-[#FFC8D4] tracking-wider uppercase mt-0.5 sm:mt-1">
              Appointment
            </span>
          </div>
        </Link>
      </div>

      {/* ============================================================= */}
      {/* SIDE ACTION BUTTON 2: "Get your memento!" (Collections)       */}
      {/* ============================================================= */}
      <div
        ref={rightBtnRef}
        className="absolute right-0 bottom-3 sm:bottom-18 md:bottom-22 lg:bottom-24 z-30 pointer-events-auto select-none opacity-0"
      >
        <a
          href="#collection"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("#collection");
          }}
          className="group flex items-center gap-2 sm:gap-3.5 pr-3 sm:pr-5 md:pr-7 pl-4 sm:pl-6 md:pl-8 py-2 sm:py-3.5 md:py-4 rounded-l-[1.75rem] bg-[#1B4083] hover:bg-[#0F2753] shadow-[0_8px_24px_rgba(27,64,131,0.25)] hover:shadow-[0_14px_40px_rgba(15,39,83,0.38)] border border-white/20 border-r-0 text-white transition-all duration-300 hover:-translate-x-2 active:scale-95 cursor-pointer"
          aria-label="Get your memento! (Collections)"
        >
          <div className="flex flex-col items-end leading-none text-right">
            <span className="font-display font-medium text-[12px] sm:text-[15px] md:text-[16px] tracking-tight text-white">
              Get your memento!
            </span>
            <span className="text-[9px] sm:text-[10.5px] md:text-[11px] font-sans font-semibold text-[#FFC8D4] tracking-wider uppercase mt-0.5 sm:mt-1">
              Collections
            </span>
          </div>
          <span className="flex h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/15 text-[#FFC8D4] group-hover:bg-[#FFC8D4] group-hover:text-[#1B4083] group-hover:translate-x-0.5 transition-all duration-300 shrink-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}

