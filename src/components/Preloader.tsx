"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const talismanRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  const [counterValue, setCounterValue] = useState(0);
  const [statusText, setStatusText] = useState("Winding sentimental tapes & memories...");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isHoldMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("hold_preloader");

    // Lock body scroll while preloader is active (unless hold mode)
    if (!isHoldMode) {
      document.body.style.overflow = "hidden";
    }

    // Failsafe timer to guarantee unlock after 2.8s
    const failsafe = setTimeout(() => {
      if (isHoldMode) return;
      document.body.style.overflow = "";
      setIsVisible(false);
      try {
        (window as any).__preloaderComplete = true;
        window.dispatchEvent(new Event("preloader-complete"));
      } catch (e) {}
    }, 2800);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (isHoldMode) return;
          clearTimeout(failsafe);
          document.body.style.overflow = "";
          setIsVisible(false);
        },
      });

      // Progress counter dummy object for GSAP tween
      const progressObj = { value: 0 };
      const isHoldMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("hold_preloader");

      // 1. Initial State
      gsap.set(badgeRef.current, { scale: 0.85, opacity: 0 });
      gsap.set(logoRef.current, { scale: 0.94, opacity: 0, y: 15 });
      gsap.set(quoteRef.current, { opacity: 0, y: 10 });
      gsap.set(metaRef.current, { opacity: 0 });
      gsap.set(progressLineRef.current, { width: "0%" });

      // 2. Ambient Atmosphere & Meta Fade-in
      tl.to(metaRef.current, {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      });

      // 3. Heirloom Badge & Studio Memento Brand Reveal
      tl.to(
        badgeRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.25"
      )
      .to(
        logoRef.current,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        quoteRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 4. Smooth Silk-Thread Progress & Counter Ticker (0 to 100)
      tl.to(
        progressObj,
        {
          value: 100,
          duration: 1.15,
          ease: "power2.inOut",
          onUpdate: () => {
            const current = Math.round(progressObj.value);
            setCounterValue(current);
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${current}%`;
            }
            if (talismanRef.current) {
              talismanRef.current.style.left = `${current}%`;
            }

            if (current >= 100) {
              setStatusText("Welcome to Studio Memento");
            } else if (current > 70) {
              setStatusText("Sparking permanent memories...");
            } else if (current > 30) {
              setStatusText("Selecting heirloom charms...");
            } else {
              setStatusText("Winding sentimental tapes...");
            }
          },
        },
        "-=0.3"
      );

      // 5. Delicate Hold at 100%
      tl.to({}, { duration: 0.18 });

      if (isHoldMode) {
        tl.add(() => {
          tl.pause();
        });
      }

      // 6. Signal Hero Section to Begin immediately before split curtains part
      tl.add(() => {
        try {
          (window as any).__preloaderComplete = true;
          window.dispatchEvent(new Event("preloader-complete"));
        } catch (e) {}
      });

      // 7. Center Elements Soft Dissolve Lift
      tl.to(
        [centerContentRef.current, metaRef.current, ambientRef.current],
        {
          opacity: 0,
          y: -14,
          duration: 0.35,
          ease: "power2.in",
        }
      );

      // 8. Luxury Heirloom Curtain Split Reveal
      tl.to(
        curtainTopRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: "expo.inOut",
        },
        "-=0.1"
      ).to(
        curtainBottomRef.current,
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
      className="preloader-container fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center overflow-hidden select-none"
    >
      {/* =================================================================== */}
      {/* LUXURY SPLIT CURTAINS (TOP & BOTTOM WARM CANVAS #FAF6F0 PANELS)    */}
      {/* =================================================================== */}
      <div
        ref={curtainTopRef}
        className="curtain-top absolute top-0 left-0 w-full h-1/2 bg-[#FAF6F0] z-0 pointer-events-none"
      />
      <div
        ref={curtainBottomRef}
        className="curtain-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#FAF6F0] z-0 pointer-events-none"
      />

      {/* =================================================================== */}
      {/* UNIFIED AMBIENT GLOW LAYER (NO SEAMS, MATCHES HOMEPAGE AESTHETIC)   */}
      {/* =================================================================== */}
      <div
        ref={ambientRef}
        className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
      >
        {/* Ambient Warm Blush Glow (Top-Left) */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[65vw] max-w-[900px] h-[65vw] max-w-[900px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, #FFB1C5 0%, #FFC1D1 50%, transparent 80%)",
            opacity: 0.65,
            filter: "blur(70px)",
          }}
        />
        {/* Ambient Warm Peach Glow (Top-Right) */}
        <div
          className="absolute top-[5%] -right-[10%] w-[60vw] max-w-[850px] h-[60vw] max-w-[850px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, #FFD1B3 0%, #FFE1C4 50%, transparent 80%)",
            opacity: 0.6,
            filter: "blur(65px)",
          }}
        />
        {/* Ambient Warm Rose Glow (Bottom-Right) */}
        <div
          className="absolute -bottom-[15%] -right-[10%] w-[65vw] max-w-[900px] h-[65vw] max-w-[900px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, #FFA8BE 0%, #FFB6C9 60%, transparent 85%)",
            opacity: 0.55,
            filter: "blur(75px)",
          }}
        />
        {/* Ambient Warm Peach Glow (Bottom-Left) */}
        <div
          className="absolute -bottom-[10%] -left-[10%] w-[55vw] max-w-[800px] h-[55vw] max-w-[800px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, #FFE4D6 0%, #FFF0E6 50%, transparent 80%)",
            opacity: 0.55,
            filter: "blur(65px)",
          }}
        />
      </div>

      {/* =================================================================== */}
      {/* EDITORIAL FRAME & METADATA                                          */}
      {/* =================================================================== */}
      <div
        ref={metaRef}
        className="absolute inset-0 z-10 pointer-events-none p-6 sm:p-10 flex flex-col justify-between"
      >
        {/* Top Editorial Header */}
        <div className="flex items-center justify-between gap-3 text-xs tracking-widest uppercase text-[#1B4083]/80 border-b border-[#1B4083]/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#FF8DA3] animate-ping" />
            <span className="font-semibold tracking-[0.2em] text-[#1B4083]">
              STUDIO MEMENTO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] text-[#1B4083]/65 font-serif italic normal-case tracking-normal">
            <span>Dombivli East</span>
            <span>•</span>
            <span>Tue–Sun: 1:00 PM – 9:00 PM</span>
          </div>

          <span className="font-semibold text-[10px] tracking-[0.25em] px-3 py-1 rounded-full bg-[#FFC8D4]/40 text-[#1B4083] border border-[#1B4083]/15">
            EST. 2024
          </span>
        </div>

        {/* Bottom Editorial Caption */}
        <div className="flex items-center justify-between text-xs tracking-wider text-[#1B4083]/70 border-t border-[#1B4083]/10 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-[#FF8DA3]">✦</span>
            <span className="font-serif italic text-xs sm:text-sm text-[#1B4083]/80">
              Heirloom Jewellery & Welded Keepsakes
            </span>
          </div>

          <div className="font-mono text-[11px] text-[#1B4083]/60 tracking-widest uppercase hidden sm:block">
            Permanent Studio
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CENTERPIECE: STUDIO MEMENTO SHOWCASE & PROGRESS EXPERIENCE          */}
      {/* =================================================================== */}
      <div
        ref={centerContentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto pointer-events-none"
      >
        {/* Romantic Pill Badge */}
        <div ref={badgeRef} className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 font-sans text-[10.5px] sm:text-xs font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full bg-white/80 text-[#1B4083] border border-[#1B4083]/15 shadow-[0_3px_12px_rgba(27,64,131,0.06)]">
            <span className="text-[#FF8DA3]">✦</span>
            <span>PERMANENT JEWELLERY & CUSTOM CHARMS</span>
            <span className="text-[#FF8DA3]">✦</span>
          </span>
        </div>

        {/* Authentic Studio Memento Curved Brand Mark */}
        <div
          ref={logoRef}
          className="relative w-64 sm:w-80 md:w-96 aspect-[500/227] flex items-center justify-center my-1 filter drop-shadow-[0_4px_16px_rgba(255,200,212,0.6)]"
        >
          <Image
            src="/images/logo-blue-hd.png"
            alt="Studio Memento"
            width={500}
            height={227}
            priority
            className="w-full h-auto object-contain select-none"
          />
        </div>

        {/* Handwritten Romantic Quote */}
        <p
          ref={quoteRef}
          className="font-satisfy text-[#1B4083]/80 text-xl sm:text-2xl mt-1 sm:mt-2 tracking-wide font-normal"
        >
          every charm holds a chapter...
        </p>

        {/* Silk-Thread Luxury Progress Bar & Live Status */}
        <div className="w-full max-w-[300px] sm:max-w-[360px] mt-8 flex flex-col gap-3">
          {/* Track with Gliding Talisman Sparkle */}
          <div className="relative w-full h-[3px] bg-[#1B4083]/10 rounded-full overflow-visible">
            {/* Gradient Fill */}
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-[#1B4083] via-[#FF8DA3] to-[#1B4083] rounded-full transition-all ease-out"
              style={{ width: "0%" }}
            />
            {/* Talisman Charm Gliding along line */}
            <div
              ref={talismanRef}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-all duration-75"
              style={{ left: "0%" }}
            >
              <div className="w-4 h-4 rounded-full bg-[#FAF6F0] border border-[#1B4083]/30 shadow-[0_0_8px_rgba(255,141,163,0.8)] flex items-center justify-center">
                <span className="text-[9px] text-[#1B4083] leading-none">✦</span>
              </div>
            </div>
          </div>

          {/* Subtitle Status & Baskervville Numeric Percentage */}
          <div className="flex items-center justify-between pt-1 text-[#1B4083] min-h-[32px]">
            <p className="font-serif italic text-[11px] sm:text-[13px] text-[#1B4083]/75 flex items-center gap-1.5 text-left truncate mr-2">
              <span className="text-[#FF8DA3] shrink-0 animate-pulse">✦</span>
              <span className="truncate">{statusText}</span>
            </p>

            <div className="flex items-baseline shrink-0">
              <span className="font-serif italic font-semibold text-2xl sm:text-3xl text-[#1B4083] tracking-tight">
                {String(counterValue).padStart(2, "0")}
              </span>
              <span className="font-serif italic text-sm text-[#FF8DA3] ml-0.5 font-bold">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
