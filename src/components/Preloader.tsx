"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lock body scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Failsafe timer to guarantee unlock after 2.2s
    const failsafe = setTimeout(() => {
      document.body.style.overflow = "";
      setIsVisible(false);
      try {
        (window as any).__preloaderComplete = true;
        window.dispatchEvent(new Event("preloader-complete"));
      } catch (e) {}
    }, 2200);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(failsafe);
          document.body.style.overflow = "";
          setIsVisible(false);
        },
      });

      // 1. Initial State
      gsap.set([emblemRef.current, logoRef.current, quoteRef.current], {
        opacity: 0,
        y: 18,
      });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      // 2. Elegant Entrance: Star Talisman & Logo fade up smoothly
      tl.to(emblemRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
      .to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        quoteRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.25"
      );

      // 3. Ultra-fine Golden Silk Thread glides smoothly across
      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.85,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

      // 4. Subtle poetic hold
      tl.to({}, { duration: 0.15 });

      // 5. Center content dissolves with an upward floating breath
      tl.to([emblemRef.current, logoRef.current, quoteRef.current, lineRef.current?.parentElement], {
        opacity: 0,
        y: -16,
        duration: 0.4,
        ease: "power3.in",
      });

      // 6. Signal Hero section to begin in sync
      tl.add(() => {
        try {
          (window as any).__preloaderComplete = true;
          window.dispatchEvent(new Event("preloader-complete"));
        } catch (e) {}
      });

      // 7. Atelier Curtain Reveal: Top and bottom silk panels slide open smoothly
      tl.to(
        ".curtain-top",
        {
          yPercent: -100,
          duration: 0.75,
          ease: "expo.inOut",
        },
        "-=0.05"
      )
      .to(
        ".curtain-bottom",
        {
          yPercent: 100,
          duration: 0.75,
          ease: "expo.inOut",
        },
        "<"
      );

    }, containerRef);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="preloader-container fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden"
    >
      {/* Top and Bottom Architectural Silk Curtains */}
      <div className="curtain-top absolute top-0 left-0 w-full h-1/2 bg-[#FAF6F0] z-0 border-b border-[#1B4083]/10" />
      <div className="curtain-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#FAF6F0] z-0 border-t border-[#1B4083]/10" />

      {/* Center Stage Presentation */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-md select-none">
        
        {/* Radiating Star Talisman Emblem */}
        <div ref={emblemRef} className="relative flex items-center justify-center mb-6">
          <div className="absolute w-20 h-20 rounded-full bg-[#FFC8D4]/50 blur-xl animate-pulse" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md border border-[#1B4083]/10 text-[#1B4083]">
            <span className="text-2xl animate-spin-slow">✦</span>
          </div>
        </div>

        {/* Studio Memento Wordmark & Atelier Emblem */}
        <div ref={logoRef} className="flex flex-col items-center gap-1.5">
          <Image
            src="/images/logo_1.png"
            alt="Studio Memento"
            width={200}
            height={75}
            priority
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#1B4083]/65 font-medium mt-1">
            Heirloom Atelier · Dombivli East
          </span>
        </div>

        {/* Poetic Whisper Subtitle */}
        <p
          ref={quoteRef}
          className="font-serif italic text-base sm:text-lg text-[#1B4083]/85 mt-5 tracking-tight font-normal"
        >
          Romanticize your becoming
        </p>

        {/* Fine Silk Thread Progress Indicator with Gleaming Gold Head */}
        <div className="w-44 sm:w-56 h-[1.5px] bg-[#1B4083]/12 rounded-full mt-7 overflow-hidden relative">
          <div
            ref={lineRef}
            className="h-full w-full bg-gradient-to-r from-[#1B4083] via-[#C5A059] to-[#1B4083]"
          />
        </div>

      </div>
    </div>
  );
}
