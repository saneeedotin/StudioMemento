"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GiantFooter() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax on the giant text
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        xPercent: -15,
      });

      // Typography reveal for "Memento" at the very bottom
      gsap.to(".memento-reveal", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "bottom bottom",
          end: "+=200", // extend the scroll distance if needed, but simple trigger is fine
        },
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Or scrub version for a parallax reveal at the bottom:
      gsap.to(".memento-scrub", {
        scrollTrigger: {
          trigger: ".memento-container",
          start: "top 95%",
          end: "bottom bottom",
          scrub: true,
        },
        y: 0,
        ease: "none",
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#fff0eb] pt-24 text-[#043c74] md:pt-36 flex flex-col min-h-screen justify-between">
      <div className="absolute top-0 left-0 w-full h-[30rem] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.7),transparent_70%)] blur-[4rem] pointer-events-none" />
      
      {/* Reduced size for readability */}
      <div className="relative z-10 w-full overflow-hidden flex justify-center">
        <h2 
          ref={textRef}
          className="whitespace-nowrap font-display text-[6rem] font-extrabold uppercase leading-[0.9] tracking-tighter md:text-[10rem] lg:text-[12rem]"
        >
          Get in touch <span className="text-[#fecbd7]">❈</span> Get in touch
        </h2>
      </div>

      <div className="container-x relative z-10 mx-auto mt-16 max-w-7xl px-6 lg:px-8 flex-1">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="font-display text-3xl font-bold uppercase md:text-5xl">Let's craft your story.</h3>
          <p className="mt-6 max-w-lg text-sm md:text-base opacity-80">
            Strong on the inside. Recognisable on the outside. Companies and individuals are truly proud of their journey. Are you ready?
          </p>
          <a href="/appointment" className="mt-10 inline-block rounded-full bg-[#043c74] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#fff0eb] transition-transform hover:scale-105">
            Book Consultation
          </a>
        </div>

        <div className="mt-24 grid gap-12 border-t border-[#043c74]/20 pt-12 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <span className="block font-bold uppercase tracking-widest opacity-60">Phone</span>
            <a href="tel:+31532340188" className="mt-2 block font-display text-xl font-bold hover:underline">+31 53 234 0188</a>
          </div>
          <div>
            <span className="block font-bold uppercase tracking-widest opacity-60">Email</span>
            <a href="mailto:hello@studiomemento.com" className="mt-2 block font-display text-xl font-bold hover:underline">hello@studiomemento.com</a>
          </div>
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-2">
            <span className="block font-bold uppercase tracking-widest opacity-60">Studio</span>
            <p className="mt-2 font-display text-xl font-bold">
              Rigtersbleek-Zandvoort 10<br />
              7521 BE Enschede
            </p>
          </div>
        </div>
      </div>

      {/* Typography Reveal Footer */}
      <div className="memento-container relative w-full overflow-hidden flex justify-center mt-20 pb-4 border-t border-[#043c74]/20 pt-8">
        <h1 className="memento-scrub font-serif text-[15vw] leading-[0.8] tracking-tight text-[#043c74] opacity-90 translate-y-full lowercase">
          memento
        </h1>
      </div>
    </footer>
  );
}
