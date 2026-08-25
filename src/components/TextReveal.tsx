"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function TextReveal() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Subtle floating and swaying animation for the jewelry background
      gsap.to(".jewelry-bg", {
        y: -40,
        rotation: 8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Split text into spans for word-by-word reveal
      if (textRef.current) {
        const words = textRef.current.innerText.split(" ");
        textRef.current.innerHTML = "";
        words.forEach((word) => {
          const span = document.createElement("span");
          span.innerText = word + " ";
          span.className = "reveal-word text-[#b9d0e5] transition-colors duration-300";
          textRef.current?.appendChild(span);
        });

        // ScrollTrigger animation
        gsap.to(".reveal-word", {
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
          color: "#043c74",
          stagger: 0.1,
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#fff0eb] px-6 py-24 sm:px-12 md:py-36"
    >
      {/* Decorative Jewelry Background Element */}
      <div className="jewelry-bg absolute left-[55%] top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-multiply blur-[2px]">
        <Image 
          src="/images/earrings.png" 
          alt="Decorative Earrings" 
          fill 
          className="object-contain"
        />
      </div>
      
      <div className="container-x relative z-10 max-w-5xl">
        <h2
          ref={textRef}
          className="font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight md:text-6xl lg:text-[4.5rem]"
        >
          Together we craft timeless elegance. Jewelry you are proud of. Radiant on the inside. Breathtaking on the outside. Driven by passion. Built on legacy.
        </h2>
      </div>
    </section>
  );
}
