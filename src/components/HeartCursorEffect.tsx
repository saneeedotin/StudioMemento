"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BLUE_HEART_COLORS = [
  "#1A4083", // Studio Memento Atelier Navy
  "#2658B5", // Vibrant Royal Blue
  "#3B82F6", // Bright Azure
  "#1B4083", // Classic Sm Blue
  "#FFC8D4", // Subtle Memento Blush Pink accent
];

const PINK_HEART_COLORS = [
  "#FFC8D4", // Signature Blossom Blush Pink
  "#FFAEC1", // Soft Petal Pink
  "#F4A6B8", // Vibrant Rose
  "#FFE5EC", // Luminous Pale Pink
  "#FFFFFF", // Pure Pearl White accent
];

export default function HeartCursorEffect() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse / trackpad)
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handlePointerDown = (e: PointerEvent) => {
      // Ignore touch events
      if (e.pointerType === "touch") return;

      const container = containerRef.current;
      if (!container) return;

      const x = e.clientX;
      const y = e.clientY;

      // Determine if clicking over dark page or dark section
      const isDarkPage = Boolean(
        document.querySelector('main.bg-\\[\\#1A4083\\], main.bg-\\[\\#1B4083\\], [data-theme="dark"]')
      );
      const targetEl = e.target as Element | null;
      const isDarkSection = Boolean(
        targetEl?.closest?.('.bg-\\[\\#1A4083\\], .bg-\\[\\#0F2753\\], .bg-\\[\\#1B4083\\], [data-theme="dark"]')
      );
      const isDark = isDarkPage || isDarkSection;

      const ringBorderColor = isDark ? "rgba(255, 200, 212, 0.7)" : "rgba(26, 64, 131, 0.4)";
      const activeColors = isDark ? PINK_HEART_COLORS : BLUE_HEART_COLORS;

      // 1. Delicate expanding ripple ring
      const ring = document.createElement("div");
      ring.className =
        "pointer-events-none fixed rounded-full border z-[99999]";
      ring.style.borderColor = ringBorderColor;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = "10px";
      ring.style.height = "10px";
      ring.style.transform = "translate(-50%, -50%) scale(0.4)";
      container.appendChild(ring);

      gsap.to(ring, {
        scale: 3.5,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          ring.remove();
        },
      });

      // 2. Delicate micro-burst of 4 to 6 floating hearts
      const heartCount = 5;
      for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement("div");
        heart.className = "pointer-events-none fixed z-[99999] select-none";
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        const size = Math.floor(Math.random() * 4) + 10; // 10px to 13px
        const color = activeColors[Math.floor(Math.random() * activeColors.length)];

        heart.innerHTML = `
          <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block; overflow:visible;">
            <path d="M16 26.5 C15.4 26.0 6.5 19.2 6.5 12.2 C6.5 8.2 9.6 5.2 13.5 5.2 C15.0 5.2 16.0 5.9 16.0 5.9 C16.0 5.9 17.0 5.2 18.5 5.2 C22.4 5.2 25.5 8.2 25.5 12.2 C25.5 19.2 16.6 26.0 16 26.5 Z" fill="${color}" />
          </svg>
        `;

        container.appendChild(heart);

        // Compute gentle physics vector (floating mostly upward and outward)
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 0.9); // Spread between -170 deg and -10 deg
        const distance = Math.random() * 32 + 18; // 18px to 50px travel
        const destX = Math.cos(angle) * distance;
        const destY = Math.sin(angle) * distance - 8; // gentle extra upward buoyancy
        const rot = (Math.random() - 0.5) * 50;

        gsap.set(heart, {
          x: 0,
          y: 0,
          scale: 0.3,
          opacity: 1,
          xPercent: -50,
          yPercent: -50,
          rotation: (Math.random() - 0.5) * 20,
        });

        const tl = gsap.timeline({
          onComplete: () => {
            heart.remove();
          },
        });

        tl.to(heart, {
          x: destX,
          y: destY,
          rotation: rot,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }).to(
          heart,
          {
            y: destY - 14, // continue floating up
            opacity: 0,
            scale: 0.6,
            duration: 0.35,
            ease: "power2.in",
          },
          "-=0.05"
        );
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-[99999]"
    />
  );
}
