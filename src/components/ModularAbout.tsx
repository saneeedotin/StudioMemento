"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ModularAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const floatCardRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<"atelier" | "pieces">("atelier");

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth entrance when section scrolls into view
      gsap.from(".about-fade", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Subtle ambient hover float on the overlapping detail card
      if (floatCardRef.current) {
        gsap.to(floatCardRef.current, {
          y: -10,
          rotation: -2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    // Mouse parallax on the image frame
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current || !imageFrameRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(imageFrameRef.current, {
        rotateY: xNorm * 4,
        rotateX: -yNorm * 4,
        duration: 1.2,
        ease: "power2.out",
        transformPerspective: 1000,
        overwrite: "auto",
      });

      if (floatCardRef.current) {
        gsap.to(floatCardRef.current, {
          x: xNorm * 12,
          y: yNorm * 10,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full max-w-full bg-transparent py-24 sm:py-36 text-white"
    >
      <div className="container-modular relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Editorial Story & Interactive Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Category Tag with Location Badge */}
            <div className="about-fade flex items-center gap-3 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFC8D4] border border-[#FFC8D4]/30 px-3.5 py-1.5 rounded-full backdrop-blur-sm bg-white/5">
                The Atelier & Philosophy
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/60 font-medium">
                <span>📍</span>
                <span>Dombivli East, Near Phadke Rd</span>
              </span>
            </div>

            {/* Editorial Headline with Baskervville Accent */}
            <h2 className="about-fade font-display text-4xl sm:text-5xl lg:text-[3.8rem] font-bold tracking-tight leading-[1.08] text-white">
              Fine jewellery rooted in{" "}
              <span className="font-serif italic font-normal text-[#FFC8D4] tracking-tight">
                emotion
              </span>
              , not mass production.
            </h2>

            {/* Narrative Story */}
            <p className="about-fade mt-8 text-base sm:text-lg leading-relaxed text-white/85">
              Studio Memento was founded on a simple conviction: jewellery should never be generic. It should hold the weight of an anniversary, the memory of a turning point, or the celebration of who you are becoming.
            </p>
            <p className="about-fade mt-4 text-base sm:text-lg leading-relaxed text-white/75">
              Working alongside master metalsmiths and lapidaries in our private studio, every piece is sculpted with 18k solid gold, anti-tarnish alloys, and sustainably sourced baroque pearls that remain with you for a lifetime.
            </p>

            {/* Interactive Atelier Highlight Pillars */}
            <div className="about-fade mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              <div className="group rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 p-4 transition-all duration-300 hover:-translate-y-1">
                <span className="text-xl mb-2 block transition-transform group-hover:scale-110">✦</span>
                <p className="font-display text-sm font-semibold text-white">Bespoke Casting</p>
                <p className="text-xs text-white/60 mt-1">Sculpted lost-wax & 18k solid gold</p>
              </div>

              <div className="group rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 p-4 transition-all duration-300 hover:-translate-y-1">
                <span className="text-xl mb-2 block transition-transform group-hover:scale-110">✿</span>
                <p className="font-display text-sm font-semibold text-white">Anti-Tarnish</p>
                <p className="text-xs text-white/60 mt-1">Tested for lifelong waterproof wear</p>
              </div>

              <div className="group rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 p-4 transition-all duration-300 hover:-translate-y-1">
                <span className="text-xl mb-2 block transition-transform group-hover:scale-110">👀</span>
                <p className="font-display text-sm font-semibold text-white">Private Studio</p>
                <p className="text-xs text-white/60 mt-1">1-on-1 custom styling sessions</p>
              </div>

            </div>

            {/* CTA Action Row */}
            <div className="about-fade mt-10 flex items-center gap-3">
              <Link
                href="/appointment"
                className="group inline-flex items-center gap-3 rounded-full bg-[#FAF6F0] px-8 py-4 text-base font-semibold tracking-tight text-[#1B4083] transition-all duration-300 hover:bg-white hover:scale-105 shadow-xl"
              >
                <span>Meet with our stylists</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC8D4] text-[#1B4083] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="hidden sm:inline-flex items-center px-6 py-4 text-sm font-semibold tracking-wider uppercase text-white/75 hover:text-white transition-colors"
              >
                Our full story
              </Link>
            </div>

          </div>

          {/* Right Column: Interactive Multi-Layer Atelier Showcase */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0 pb-8 sm:pb-0">
            
            {/* View Switcher Pill (The Studio vs The Craft) */}
            <div className="about-fade mb-5 sm:mb-0 sm:absolute sm:-top-14 sm:left-4 z-30 inline-flex items-center gap-1.5 rounded-full bg-white/10 p-1.5 backdrop-blur-md border border-white/15 shadow-lg">
              <button
                type="button"
                onClick={() => setActiveView("atelier")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                  activeView === "atelier"
                    ? "bg-[#FAF6F0] text-[#1B4083] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                The Atelier Room
              </button>
              <button
                type="button"
                onClick={() => setActiveView("pieces")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                  activeView === "pieces"
                    ? "bg-[#FAF6F0] text-[#1B4083] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                The Jewellery
              </button>
            </div>

            {/* Rotating Circular Brand Seal */}
            <div className="absolute -top-10 -right-6 sm:-right-8 z-30 hidden sm:flex items-center justify-center pointer-events-none">
              <div className="relative w-28 h-28 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-[#FFC8D4]">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9.5px] font-mono tracking-[0.24em] uppercase">
                    <textPath href="#circlePath">
                      ✦ STUDIO MEMENTO ✦ HEIRLOOM ATELIER ✦
                    </textPath>
                  </text>
                </svg>
              </div>
              <span className="absolute text-xl text-[#FFC8D4]">✿</span>
            </div>

            {/* Main Interactive Image Frame */}
            <div
              ref={imageFrameRef}
              className="about-fade relative aspect-[4/3] sm:aspect-[1.18] w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#0F2753] border-4 border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-300"
            >
              {/* Image 1: The Studio Workshop */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${activeView === "atelier" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}>
                <Image
                  src="/images/Workshop.png"
                  alt="Studio Memento Artisan Workshop Bench"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081836]/80 via-transparent to-transparent" />
              </div>

              {/* Image 2: The Handcrafted Jewellery */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${activeView === "pieces" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"}`}>
                <Image
                  src="/images/18k_Gold_Plated.png"
                  alt="Client enjoying Studio Memento 18k handcrafted jewellery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081836]/80 via-transparent to-transparent" />
              </div>

              {/* Live Studio Status Badge Pinned to Top Left of Frame */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2.5 rounded-full bg-black/50 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-white border border-white/15 shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>
                  {activeView === "atelier" ? "Atelier Open · Dombivli East" : "Handcrafted 18k Solid Gold"}
                </span>
              </div>
            </div>

            {/* Overlapping Floating Detail Polaroid Card */}
            <div
              ref={floatCardRef}
              className="about-fade absolute -bottom-4 sm:-bottom-8 left-2 sm:-left-10 z-20 w-36 sm:w-56 aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF6F0] p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border-2 border-white/40 transform -rotate-3 transition-transform hover:rotate-0 duration-300"
            >
              <div className="relative w-full h-[78%] rounded-2xl overflow-hidden bg-[#FFF0EB]">
                <Image
                  src="/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png"
                  alt="Soleil Statement Pearl Earrings"
                  fill
                  sizes="200px"
                  className="object-cover object-center transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="pt-2 px-1 text-center">
                <p className="font-display text-[11px] sm:text-xs font-bold text-[#1B4083] truncate">
                  Baroque Pearl & 18k Gold
                </p>
                <p className="font-serif italic text-[10px] text-[#1B4083]/70">
                  Cast by hand in studio
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
