"use client";

import Image from "next/image";

const POLAROID_IMAGES = [
  { src: "/images/spool-girl-earring.png", alt: "Earring editorial", rotate: "-3deg" },
  { src: "/images/heart-card-editorial.png", alt: "Heart locket", rotate: "2deg" },
  { src: "/images/spool-girl-m.png", alt: "Studio portrait", rotate: "-1deg" },
  { src: "/images/earrings.png", alt: "Drop earrings", rotate: "3deg" },
  { src: "/images/necklace.png", alt: "Necklace", rotate: "-2deg" },
  { src: "/images/18k_Gold_Plated.png", alt: "Gold plated", rotate: "1.5deg" },
  { src: "/images/spool-left.png", alt: "Spool left", rotate: "-3.5deg" },
  { src: "/images/spool-right.png", alt: "Spool right", rotate: "2.5deg" },
  { src: "/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png", alt: "Pearl earrings", rotate: "-1.5deg" },
  { src: "/images/heart-collection.png", alt: "Heart collection", rotate: "3deg" },
];

// Duplicate for seamless infinite loop
const STRIP = [...POLAROID_IMAGES, ...POLAROID_IMAGES, ...POLAROID_IMAGES];

export function MobilePolaroidStrip() {
  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ height: 115, transform: "rotate(-5deg) translateY(-6px)", transformOrigin: "center center" }}
    >
      {/* Left blur fade */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "15%",
          background: "linear-gradient(to right, rgba(255,240,235,1) 0%, rgba(255,240,235,0) 100%)",
        }}
      />
      {/* Right blur fade */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "15%",
          background: "linear-gradient(to left, rgba(255,240,235,1) 0%, rgba(255,240,235,0) 100%)",
        }}
      />

      {/* Scrolling strip */}
      <div
        className="flex items-center gap-3 absolute top-0 left-0"
        style={{
          animation: "polaroid-scroll 28s linear infinite",
          willChange: "transform",
          paddingTop: 6,
          paddingBottom: 6,
        }}
      >
        {STRIP.map((p, i) => (
          <div
            key={i}
            className="shrink-0 bg-white shadow-md p-1.5 pb-5"
            style={{
              width: 67,
              transform: `rotate(${p.rotate})`,
            }}
          >
            <div className="relative overflow-hidden bg-gray-100" style={{ width: "100%", height: 75 }}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover"
                sizes="67px"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes polaroid-scroll {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
