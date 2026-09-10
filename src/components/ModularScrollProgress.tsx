"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ModularScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(lineRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 right-0 h-full w-[4px] sm:w-[6px] z-50 overflow-hidden pointer-events-none scroll-progress-track">
      <div
        ref={lineRef}
        className="w-full h-full origin-top scale-y-0 scroll-progress-thumb"
      />
    </div>
  );
}
