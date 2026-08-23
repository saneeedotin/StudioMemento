"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className="inline-flex"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        gsap.to(ref.current, { x: x * 0.16, y: y * 0.2, duration: 0.45, ease: "power3.out" });
      }}
      onPointerLeave={() => {
        if (ref.current) {
          gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" });
        }
      }}
    >
      {children}
    </span>
  );
}
