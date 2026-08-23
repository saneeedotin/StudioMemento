"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduce || !dot || !ring) return;

    document.documentElement.classList.add("has-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, force3D: true });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor], input, textarea, select, label"
      );
      gsap.to(ring, {
        scale: interactive ? 2 : 1,
        opacity: interactive ? 0.9 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: interactive ? 0.4 : 1, duration: 0.35 });
    };

    const down = () => gsap.to(ring, { scale: 0.7, duration: 0.18 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.3 });
    const leave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-10 w-10 rounded-full border border-white opacity-0 mix-blend-difference md:block"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference md:block"
      />
    </>
  );
}
