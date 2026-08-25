"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { scrollToId } from "@/components/SmoothScroll";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" }, paused: true });
      intro
        .from("[data-hero-item]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.08 })
        .from("[data-hero-line]", { clipPath: "inset(0 100% 0 0)", duration: 1.1, stagger: 0.12 }, "-=0.35")
        .from("[data-hero-card]", { opacity: 0, scale: 0.94, duration: 0.9 }, "-=0.65");

      gsap.to("[data-hero-glow]", { xPercent: 2, yPercent: 3, scale: 1.02, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to("[data-hero-card]", { y: -8, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });

      const handlePreloaderComplete = () => intro.play();
      window.addEventListener("preloader-complete", handlePreloaderComplete);

      return () => window.removeEventListener("preloader-complete", handlePreloaderComplete);
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="dark" className="relative isolate min-h-svh overflow-hidden bg-[#043c74] text-[#ffd2df]">
      <div data-hero-glow aria-hidden className="pointer-events-none absolute -top-[5%] left-[35%] h-[15%] w-[30%] rounded-full bg-[#fecbd7] blur-[2.5rem] opacity-90" />
      <div aria-hidden className="pointer-events-none absolute -bottom-[20%] -left-[10%] h-[70%] w-[45%] rounded-[100%] bg-[radial-gradient(ellipse,#fecbd7_0%,#f0c5d4_45%,#a998b5_70%,transparent_80%)] blur-[4.5rem] opacity-85" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_53%_0%,rgba(255,255,255,0.6),transparent_18%),linear-gradient(180deg,transparent_58%,rgba(252,202,214,0.06))]" />

      <div className="relative z-10 flex min-h-svh flex-col px-6 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
        <header data-hero-item className="flex items-start justify-between">
          <a href="#top" aria-label="Studio Memento home" className="transition-opacity hover:opacity-75">
            <Image src="/logo.png" alt="Studio Memento" width={108} height={36} className="h-auto w-[6rem] sm:w-[7.2rem]" priority />
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <button type="button" onClick={() => scrollToId("#stories")} className="hidden md:block rounded-full bg-[#fff8f1] px-5 py-2.5 text-sm font-medium text-[#153e6c] shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffc7d8]">Collection</button>
            <button type="button" onClick={() => window.location.href = "/appointment"} className="rounded-full bg-[#fff8f1] px-5 py-2.5 text-sm font-medium text-[#153e6c] shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffc7d8]">
              <span className="hidden sm:inline">Book an appointment</span>
              <span className="sm:hidden">Book</span>
            </button>
          </div>
        </header>

        <div className="mt-[11vh] sm:mt-[12vh] lg:mt-[10vh]">
          <p data-hero-item className="text-lg text-white sm:text-xl lg:text-2xl">Explore the artistry of</p>
          <h1 aria-label="Romanticize your becoming." className="mt-4 font-display text-[clamp(2.5rem,10.25vw,9.4rem)] font-extrabold uppercase leading-[0.87] tracking-[-0.065em] text-[#ffc7d8] break-words">
            <span data-hero-line className="block">Romanticize</span>
            <span data-hero-line className="block">your becoming.</span>
          </h1>
        </div>

        <div className="mt-auto grid items-end gap-8 border-t border-[#b9d0e5]/70 pt-8 lg:grid-cols-[13rem_minmax(27rem,31rem)_minmax(22rem,1fr)] lg:gap-8">
          <div data-hero-item className="relative hidden min-h-[20rem] items-center justify-start lg:flex">
            <p className="rotate-[-90deg] -ml-16 font-display text-2xl font-extrabold uppercase leading-[1.1] tracking-[0.05em] text-[#0b335c]">
              NEW ARRIVALS /<br />JEWELRY
            </p>
          </div>
          <article data-hero-card className="relative -translate-y-8 aspect-[1.83] overflow-hidden rounded-[1.55rem] bg-[#fff0eb] shadow-[0_18px_35px_rgba(0,21,54,0.22)] sm:rounded-[1.75rem]">
            <Image src="/images/heart-card-editorial.png" alt="The Heart Collection editorial jewellery card" fill sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover" />
            <button type="button" aria-label="Shop the Heart Collection" onClick={() => window.location.href = "/appointment"} className="absolute bottom-[7%] left-[5%] h-[18%] w-[22%] rounded-full focus-visible:bg-white/30" />
            <button type="button" aria-label="Shop the Heart Collection" onClick={() => window.location.href = "/appointment"} className="absolute bottom-[26%] right-[13%] h-[18%] w-[22%] rounded-full focus-visible:bg-white/30" />
          </article>

          <div data-hero-item className="max-w-md lg:ml-auto lg:max-w-[25rem]">
            <button type="button" onClick={() => window.location.href = "/appointment"} className="group flex items-center gap-2 font-serif text-xl italic text-white transition-colors duration-300 hover:text-[#ffc7d8] pt-2">
              <span>Book an appointment</span>
              <svg className="h-5 w-5 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <p className="py-6 text-base leading-[1.2] text-white sm:text-lg pr-4 lg:pr-0">A curated destination for timeless jewelry, celebrating your personal journey. Because every piece holds a memory.</p>
            <div className="h-px bg-[#b9d0e5]/70" />
            <button type="button" onClick={() => scrollToId("#stories")} className="group mt-7 text-left font-display text-lg font-extrabold uppercase text-white sm:text-xl"><span className="border-b border-white/60 pb-1 transition-colors group-hover:text-[#ffc7d8]">View all charms</span><span className="mt-4 block font-serif text-[1.15rem] italic font-normal uppercase tracking-[0.15em] text-[#fff4f1]">DISCOVER THE BAR</span></button>
          </div>
        </div>
      </div>
    </section>
  );
}
