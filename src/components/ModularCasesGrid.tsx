"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  video?: string;
  instagramUrl?: string;
  tags: { label: string; icon: string }[];
  offsetClass?: string;
  aspectClass?: string;
}

const ITEMS: CollectionItem[] = [
  {
    id: "soleil",
    title: "A Home for Keepsakes in Dombivli",
    subtitle: "Our cozy studio is open near Phadke Road. Step inside to build your charm story and take home something that stays with you forever.",
    image: "/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png",
    video: "/videos/reel1.mp4",
    instagramUrl: "https://www.instagram.com/studiomemento.in_/reels/",
    tags: [
      { label: "Our Studio", icon: "✦" },
      { label: "Near Phadke Road", icon: "📍" },
    ],
    offsetClass: "md:translate-y-0",
    aspectClass: "aspect-[9/16]",
  },
  {
    id: "heart",
    title: "The Walk-In Memory Bar",
    subtitle: "Open Tue–Sun: 1:00 PM – 9:00 PM. Drop in after an evening stroll, explore 60+ hand-cast charms, and curate a talisman that carries your moments.",
    image: "/images/heart-card-editorial.png",
    video: "/videos/reel2.mp4",
    instagramUrl: "https://www.instagram.com/studiomemento.in_/reels/",
    tags: [
      { label: "Tue–Sun: 1–9 PM (Mon Closed)", icon: "⏱" },
      { label: "60+ Symbolic Charms", icon: "✿" },
    ],
    offsetClass: "md:translate-y-32",
    aspectClass: "aspect-[9/16]",
  },
  {
    id: "flower-pearl",
    title: "The Forever Spark on Your Wrist",
    subtitle: "Seamless permanent jewellery, custom-measured and sparked in 15 minutes. A beautiful memento of love and milestones.",
    image: "/images/Soleil_Statement_flower_anti-tarnish_pearl_earrings.png",
    video: "/videos/reel3.mp4",
    instagramUrl: "https://www.instagram.com/studiomemento.in_/reels/",
    tags: [
      { label: "15-Min Permanent Link", icon: "⚡" },
      { label: "Waterproof & Everyday Wear", icon: "✦" },
    ],
    offsetClass: "md:translate-y-12",
    aspectClass: "aspect-[9/16]",
  },
];

function CaseCard({ item }: { item: CollectionItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const targetUrl = item.instagramUrl || `${SITE.instagram}reels/`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <article
      className={`group flex flex-col w-full max-w-[340px] mx-auto transition-transform duration-500 ${item.offsetClass}`}
    >
      {/* Clickable Image / Video Frame redirecting to Instagram */}
      <a
        ref={containerRef}
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${item.title} on Instagram`}
        className={`relative block w-full max-w-[340px] overflow-hidden rounded-[2rem] bg-[#FFF0EB] border border-[#1B4083]/10 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:border-[#1B4083]/30 cursor-pointer ${item.aspectClass || 'aspect-[1.3]'}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!item.video && (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
        )}

        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-[#1B4083]/0 transition-colors duration-300 group-hover:bg-[#1B4083]/5 pointer-events-none" />

        {/* Instagram Indicator Pill */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold text-white border border-white/20 shadow-md group-hover:bg-[#1B4083]/90 transition-all duration-300">
          <svg className="w-3.5 h-3.5 text-[#FFC8D4]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Watch Reel ↗</span>
        </div>

        {/* Custom Hover Cursor Follower */}
        {item.video && (
          <div
            className="pointer-events-none absolute z-20 flex h-16 w-16 items-center justify-center rounded-full bg-[#1B4083]/90 backdrop-blur-md border border-white/40 text-white text-xs font-semibold tracking-wide transition-opacity duration-200 shadow-xl"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              transform: "translate(-50%, -50%)",
              opacity: isHovered ? 1 : 0,
            }}
          >
            Watch ↗
          </div>
        )}

        {/* Mute/Unmute Toggle */}
        {item.video && (
          <button
            type="button"
            onClick={toggleMute}
            className={`absolute bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-all duration-300 shadow-lg ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
            aria-label="Toggle mute"
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        )}
      </a>

      {/* Title & Description */}
      <div className="mt-6">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/title inline-flex items-baseline gap-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1B4083] transition-colors hover:text-[#0F2753]"
        >
          <span>{item.title}</span>
          <span className="text-base text-[#1B4083]/40 transition-transform duration-300 group-hover/title:translate-x-1 group-hover/title:-translate-y-0.5">↗</span>
        </a>
        <p className="mt-2 text-sm sm:text-base text-[#1B4083]/75 leading-relaxed">
          {item.subtitle}
        </p>

        {/* Tag Pills with Geometric SVG/Unicode Icons */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold tracking-tight text-[#1B4083] border border-[#1B4083]/15 shadow-sm transition-all hover:bg-[#FFC8D4]"
            >
              <span className="text-[11px] text-[#1B4083]">{tag.icon}</span>
              <span>{tag.label}</span>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ModularCasesGrid() {
  return (
    <section id="collection" className="relative pt-12 sm:pt-16 pb-24 sm:pb-36 text-[#1B4083]">
      <div className="container-modular max-w-7xl relative z-10">
        {/* Header Intro Section */}
        <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-[#FFC8D4] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#1B4083] mb-4">
            ✦ The Memento Archives & Reels ✦
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B4083]">
            Jewellery crafted for lifelong stories.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#1B4083]/80 leading-relaxed">
            Every piece in our store begins with a personal memory. Explore our custom charm bars, permanent jewellery, and everyday staples captured in motion.
          </p>
        </div>

        {/* 3-Column Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-x-10 md:gap-y-0 items-start justify-items-center">
          {ITEMS.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom Collection Action */}
        <div className="mt-16 sm:mt-32 md:mt-56 text-center">
          <Link
            href="/appointment"
            className="inline-flex items-center gap-3 rounded-full bg-[#1B4083] px-8 py-4 text-base font-semibold tracking-tight text-white shadow-lg transition-all duration-300 hover:bg-[#0F2753] hover:scale-105"
          >
            <span>Book your styling session</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC8D4] text-[#1B4083]">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
