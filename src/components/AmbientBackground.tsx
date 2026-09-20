"use client";

import { ReactNode } from "react";

interface AmbientBackgroundProps {
  children: ReactNode;
  variant?: "pink" | "peach" | "navy";
  className?: string;
}

export default function AmbientBackground({
  children,
  variant = "pink",
  className = "",
}: AmbientBackgroundProps) {
  // Define sphere colors based on variant
  const colors =
    variant === "pink"
      ? {
          glow1: "radial-gradient(circle at 50% 50%, #FFB1C5 0%, #FFC1D1 50%, transparent 80%)",
          glow2: "radial-gradient(circle at 50% 50%, #FFA8BE 0%, #FFB6C9 60%, transparent 85%)",
          glow3: "radial-gradient(circle at 50% 50%, #FFB6C9 0%, #FFC8D6 55%, transparent 80%)",
          glow4: "radial-gradient(circle at 50% 50%, #FFC5D3 0%, #FFD6E2 50%, transparent 80%)",
          glowPeach: "radial-gradient(circle at 50% 50%, #FFD1B3 0%, #FFE1C4 50%, transparent 80%)",
        }
      : variant === "peach"
      ? {
          glow1: "radial-gradient(circle at 50% 50%, #FFD1B3 0%, #FFE1C4 50%, transparent 80%)",
          glow2: "radial-gradient(circle at 50% 50%, #FFC8B3 0%, #FFD6C4 60%, transparent 85%)",
          glow3: "radial-gradient(circle at 50% 50%, #FFC8B3 0%, #FFDFD0 60%, transparent 80%)",
          glow4: "radial-gradient(circle at 50% 50%, #FFC5D3 0%, #FFD6E2 50%, transparent 80%)",
          glowPeach: "radial-gradient(circle at 50% 50%, #FFE4D6 0%, #FFF0E6 50%, transparent 80%)",
        }
      : {
          // Navy variant: Deep royal atelier canvas with subtle rose, amber, and cobalt luminous glow
          glow1: "radial-gradient(circle at 50% 50%, rgba(255, 200, 212, 0.18) 0%, rgba(255, 180, 195, 0.08) 50%, transparent 80%)",
          glow2: "radial-gradient(circle at 50% 50%, rgba(61, 101, 196, 0.35) 0%, rgba(35, 75, 160, 0.15) 50%, transparent 85%)",
          glow3: "radial-gradient(circle at 50% 50%, rgba(245, 226, 184, 0.14) 0%, rgba(240, 210, 150, 0.05) 50%, transparent 80%)",
          glow4: "radial-gradient(circle at 50% 50%, rgba(255, 200, 212, 0.14) 0%, rgba(255, 180, 195, 0.06) 50%, transparent 80%)",
          glowPeach: "radial-gradient(circle at 50% 50%, rgba(61, 101, 196, 0.25) 0%, rgba(26, 64, 131, 0.1) 50%, transparent 80%)",
        };

  return (
    <div
      className={`relative w-full max-w-full ${
        variant === "navy"
          ? "dark-section bg-[#1A4083] text-[#FAF6F0] rounded-t-[2.5rem] sm:rounded-t-[4rem] rounded-b-[2.5rem] sm:rounded-b-[4rem] -mt-8 sm:-mt-16 z-20"
          : ""
      } ${className}`}
    >
      {/* CSS Animations for organic floating ambient motion */}
      <style>{`
        @keyframes floatSlow1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3%, 4%) scale(1.04); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, 3%) scale(0.96); }
        }
        @keyframes floatSlow3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(2%, -3%) scale(1.03); }
        }
        .animate-ambient-1 { animation: floatSlow1 22s ease-in-out infinite; }
        .animate-ambient-2 { animation: floatSlow2 26s ease-in-out infinite; }
        .animate-ambient-3 { animation: floatSlow3 24s ease-in-out infinite; }
      `}</style>

      {/* Ambient Spheres Container - Contained within inset-0 with overflow-hidden */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {variant === "pink" ? (
          <>
            {/* Top Left Sphere (Hero) */}
            <div
              className="absolute -top-[2%] -left-[20%] h-[70vw] w-[70vw] max-w-[1100px] rounded-full animate-ambient-3"
              style={{ background: colors.glow1, opacity: 0.65, filter: "blur(50px)" }}
            />

            {/* Top Right Sphere (Hero & Tagline) */}
            <div
              className="absolute top-[8%] -right-[12%] h-[60vw] w-[60vw] max-w-[950px] rounded-full animate-ambient-2"
              style={{ background: colors.glow2, opacity: 0.65, filter: "blur(50px)" }}
            />

            {/* Seamless Bridge Spheres (Made To Mean Something Chapter) */}
            <div
              className="absolute top-[18%] -left-[10%] h-[60vw] w-[60vw] max-w-[950px] rounded-full animate-ambient-1"
              style={{ background: colors.glow1, opacity: 0.55, filter: "blur(50px)" }}
            />
            <div
              className="absolute top-[22%] -right-[8%] h-[65vw] w-[65vw] max-w-[1000px] rounded-full animate-ambient-3"
              style={{ background: colors.glowPeach, opacity: 0.5, filter: "blur(50px)" }}
            />

            {/* Mid Left Sphere (Manifesto) */}
            <div
              className="absolute top-[32%] -left-[15%] h-[65vw] w-[65vw] max-w-[1000px] rounded-full animate-ambient-1"
              style={{ background: colors.glow3, opacity: 0.55, filter: "blur(80px)" }}
            />

            {/* Mid Right Sphere (Manifesto Reel) */}
            <div
              className="absolute top-[42%] -right-[10%] h-[70vw] w-[70vw] max-w-[1100px] rounded-full animate-ambient-3"
              style={{ background: colors.glow4, opacity: 0.6, filter: "blur(80px)" }}
            />

            {/* Bridge Sphere: Manifesto into Cases Grid seam */}
            <div
              className="absolute top-[48%] -left-[10%] h-[68vw] w-[68vw] max-w-[1050px] rounded-full animate-ambient-1"
              style={{ background: colors.glow1, opacity: 0.55, filter: "blur(80px)" }}
            />

            {/* Cases Grid Headline & Archives Sphere */}
            <div
              className="absolute top-[54%] -right-[8%] h-[68vw] w-[68vw] max-w-[1050px] rounded-full animate-ambient-2"
              style={{ background: colors.glowPeach, opacity: 0.5, filter: "blur(80px)" }}
            />

            {/* Cases Grid Center-Left Masonry Sphere */}
            <div
              className="absolute top-[60%] left-[12%] h-[72vw] w-[72vw] max-w-[1150px] rounded-full animate-ambient-3"
              style={{ background: colors.glow3, opacity: 0.55, filter: "blur(80px)" }}
            />

            {/* Transition Bridge Sphere (Into Lower Cases Grid) */}
            <div
              className="absolute top-[66%] left-[20%] h-[75vw] w-[75vw] max-w-[1200px] rounded-full animate-ambient-2"
              style={{ background: colors.glow2, opacity: 0.55, filter: "blur(80px)" }}
            />

            {/* Cases Grid Right Edge Glow */}
            <div
              className="absolute top-[72%] -right-[10%] h-[65vw] w-[65vw] max-w-[1000px] rounded-full animate-ambient-1"
              style={{ background: colors.glow4, opacity: 0.55, filter: "blur(80px)" }}
            />

            {/* Reviews & FAQ Upper Bridge */}
            <div
              className="absolute top-[78%] -left-[12%] h-[70vw] w-[70vw] max-w-[1100px] rounded-full animate-ambient-2"
              style={{ background: colors.glow1, opacity: 0.5, filter: "blur(80px)" }}
            />

            {/* Bottom Sphere (Cases Grid Showcase) */}
            <div
              className="absolute bottom-[3%] -left-[10%] h-[65vw] w-[65vw] max-w-[1000px] rounded-full animate-ambient-1"
              style={{ background: colors.glowPeach, opacity: 0.5, filter: "blur(80px)" }}
            />
          </>
        ) : variant === "peach" ? (
          <>
            {/* Top Right Sphere (Client Testimonials) */}
            <div
              className="absolute top-[2%] -right-[15%] h-[70vw] w-[70vw] max-w-[1100px] rounded-full animate-ambient-2"
              style={{ background: colors.glow1, opacity: 0.65, filter: "blur(50px)" }}
            />

            {/* Mid Left Sphere (Journal Notes From The Bench) */}
            <div
              className="absolute top-[35%] -left-[15%] h-[75vw] w-[75vw] max-w-[1200px] rounded-full animate-ambient-1"
              style={{ background: colors.glow2, opacity: 0.65, filter: "blur(50px)" }}
            />

            {/* Lower Center Sphere (Romanticize Consultation Banner) */}
            <div
              className="absolute top-[68%] left-[20%] h-[70vw] w-[70vw] max-w-[1100px] rounded-full animate-ambient-3"
              style={{ background: colors.glow3, opacity: 0.6, filter: "blur(50px)" }}
            />

            {/* Bottom Right Glow (Bleeding into Navy Footer) */}
            <div
              className="absolute bottom-[1%] -right-[10%] h-[60vw] w-[60vw] max-w-[950px] rounded-full animate-ambient-1"
              style={{ background: colors.glow4, opacity: 0.55, filter: "blur(50px)" }}
            />
          </>
        ) : (
          <>
            {/* Navy Variant: Continuous ambient spheres spanning Services through About */}
            {/* Top Right Sphere (Services Headline) */}
            <div
              className="absolute top-[4%] -right-[15%] h-[70vw] w-[70vw] max-w-[1100px] rounded-full animate-ambient-2"
              style={{ background: colors.glow1, opacity: 0.7, filter: "blur(70px)" }}
            />

            {/* Mid Left Sphere (Stacked Cards Area) */}
            <div
              className="absolute top-[28%] -left-[15%] h-[75vw] w-[75vw] max-w-[1200px] rounded-full animate-ambient-1"
              style={{ background: colors.glow2, opacity: 0.65, filter: "blur(70px)" }}
            />

            {/* Mid Right Sphere (Stacked Cards Lower Runway) */}
            <div
              className="absolute top-[45%] -right-[12%] h-[65vw] w-[65vw] max-w-[1000px] rounded-full animate-ambient-3"
              style={{ background: colors.glow3, opacity: 0.6, filter: "blur(70px)" }}
            />

            {/* Transition Seam Bridge Sphere (Seamlessly unites Services and About) */}
            <div
              className="absolute top-[60%] left-[10%] h-[80vw] w-[80vw] max-w-[1300px] rounded-full animate-ambient-1"
              style={{ background: colors.glow4, opacity: 0.65, filter: "blur(80px)" }}
            />

            {/* About Headline Glow */}
            <div
              className="absolute top-[75%] -left-[10%] h-[65vw] w-[65vw] max-w-[1000px] rounded-full animate-ambient-2"
              style={{ background: colors.glow2, opacity: 0.55, filter: "blur(70px)" }}
            />

            {/* Bottom Atelier & Video Glow */}
            <div
              className="absolute bottom-[2%] -right-[10%] h-[65vw] w-[65vw] max-w-[1050px] rounded-full animate-ambient-3"
              style={{ background: colors.glowPeach, opacity: 0.6, filter: "blur(70px)" }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
