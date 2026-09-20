"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";

export default function ModularManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLAnchorElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Animation: Pinned Scrub Morphing (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate Video Morphing to right side
      tl.to(
        imageWrapperRef.current,
        {
          width: "48vw",
          height: "92vh",
          left: "75%",
          borderRadius: "32px",
          ease: "power2.inOut",
        },
        0
      );

      // Animate Text Content In on left side
      tl.fromTo(
        textContentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.2
      );
    });

    // Mobile Layout: Clean Natural Scroll (< 768px)
    mm.add("(max-width: 767px)", () => {
      // Ensure text and video are cleanly visible in natural flow with zero overlap
      if (textContentRef.current) {
        gsap.set(textContentRef.current, { opacity: 1, y: 0, clearProps: "all" });
      }
      if (imageWrapperRef.current) {
        gsap.set(imageWrapperRef.current, { clearProps: "all" });
      }

      // Smooth scroll reveal for mobile cards
      gsap.from(textContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(imageWrapperRef.current, {
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => mm.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="conversion"
      ref={containerRef}
      className="relative w-full min-h-screen md:h-screen bg-transparent py-16 md:py-0 px-5 sm:px-10 lg:px-24 flex flex-col md:block items-center justify-center overflow-x-clip overflow-y-visible text-[#1B4083]"
    >
      {/* Text Content (Left Half on Desktop, Top Block on Mobile) */}
      <div
        ref={textContentRef}
        className="relative md:absolute top-auto md:top-0 left-auto md:left-0 w-full md:w-[50vw] md:h-full flex flex-col justify-center items-start z-20 pointer-events-auto mb-10 md:mb-0 max-w-lg md:max-w-none mx-auto md:mx-0 md:px-8 lg:px-24"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1B4083]/15 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#1B4083] backdrop-blur-sm shadow-sm w-fit">
          <span>✦</span>
          <span>The Forever Memento · Permanent Jewellery</span>
          <span>✦</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5">
          Sparked into <br /> Memory.
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-[#1B4083]/80 mb-8 max-w-md leading-relaxed">
          More than a chain, it’s a moment held forever in gold. A seamless, claspless bond sparked gently to your wrist—marking a love, a milestone, or a quiet promise to remember.
        </p>

        <Link
          href="/appointment"
          className="group inline-flex items-center justify-center gap-3 w-full sm:w-fit rounded-full bg-[#1B4083] px-8 py-4 text-base font-semibold tracking-wide text-white shadow-xl transition-all duration-300 hover:bg-[#0F2753] hover:scale-105 active:scale-95 pointer-events-auto text-center"
        >
          <span>Book Your Session</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Video Container (Right Half on Desktop, Centered Reel Card on Mobile) */}
      <a
        ref={imageWrapperRef}
        href={`${SITE.instagram}reels/`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Watch Permanent Jewellery Reel on Instagram"
        className="relative md:absolute top-auto md:top-1/2 left-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-[2rem] overflow-hidden z-10 shadow-2xl mx-auto cursor-pointer block group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src="/videos/permanantjewellery.mp4"
          loop
          autoPlay
          muted={isMuted}
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Instagram Indicator Pill */}
        <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white border border-white/20 shadow-md group-hover:bg-[#1B4083]/90 transition-all duration-300">
          <svg className="w-3.5 h-3.5 text-[#FFC8D4]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Watch Reel ↗</span>
        </div>

        {/* Custom Hover Cursor (Desktop Only) */}
        <div
          className="pointer-events-none absolute z-20 hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-[#1B4083]/90 backdrop-blur-md border border-white/40 text-white text-xs font-semibold tracking-wide transition-opacity duration-200 shadow-xl"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          Watch ↗
        </div>

        {/* Mute/Unmute Toggle */}
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors shadow-lg active:scale-90"
          aria-label="Toggle mute"
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </a>
    </section>
  );
}
