"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new Event("preloader-complete"));
          setIsVisible(false);
        }
      });

      const rotations = [-4, 3];

      tl.fromTo(
        ".preloader-pill",
        { y: -300, opacity: 0, rotation: 0 },
        {
          y: 0,
          opacity: 1,
          rotation: (i) => rotations[i],
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.2)"
        }
      );

      // Add a small pause for effect
      tl.to({}, { duration: 0.5 });

      // Slide the whole preloader up
      tl.to(container.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
      });
    }, container);

    return () => ctx.revert();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fecbd7]"
    >
      <div className="flex flex-col items-center justify-center space-y-[-1rem]">
        <div className="preloader-pill relative z-[4] rounded-full bg-[#043c74] px-12 py-4 text-center shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          <span className="block font-display text-2xl font-bold uppercase tracking-widest text-[#fff0eb]">Studio</span>
        </div>
        <div className="preloader-pill relative z-[3] rounded-full border-2 border-[#043c74] bg-[#fff0eb] px-14 py-4 text-center shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          <span className="block font-serif text-3xl italic text-[#043c74]">Memento</span>
        </div>
      </div>
    </div>
  );
}
