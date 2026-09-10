"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  video?: string;
  tags: { label: string; icon: string }[];
  offsetClass?: string;
  aspectClass?: string;
}

const ITEMS: CollectionItem[] = [
  {
    id: "soleil",
    title: "Your favourite Studio has been Re-located!!",
    subtitle: "Now find Studio Memento at the heart of Dombivli, Near Phadke road!!",
    image: "/images/Soleil_Statement_anti-tarnish_drop_pearl_earrings.png",
    video: "/videos/reel1.mp4",
    tags: [
      { label: "Visit us", icon: "✦" },
      { label: "Dombivli East", icon: "📍" },
    ],
    offsetClass: "md:translate-y-0",
    aspectClass: "aspect-[9/16]",
  },
  {
    id: "heart",
    title: "Find your way to Studio Memento",
    subtitle: "Just a few minutes from Dombivli and Thakurli Station, Right next to the infamous Phadke road, Make sure to visit us!!.",
    image: "/images/heart-card-editorial.png",
    video: "/videos/reel2.mp4",
    tags: [
      { label: "Find your way", icon: "✿" },
      { label: "Start Your Story", icon: "✦" },
    ],
    offsetClass: "md:translate-y-32",
    aspectClass: "aspect-[9/16]",
  },
  {
    id: "flower-pearl",
    title: "Permanent Jewellery in DOMBIVLI?!?",
    subtitle: "Yes, you heard it right, get yours NOW!",
    image: "/images/Soleil_Statement_flower_anti-tarnish_pearl_earrings.png",
    video: "/videos/reel3.mp4",
    tags: [
      { label: "Permanent Jewellery", icon: "✿" },
      { label: "Book your slot now!", icon: "👀" },
    ],
    offsetClass: "md:translate-y-12",
    aspectClass: "aspect-[9/16]",
  },
];

function CaseCard({ item }: { item: CollectionItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      {/* Image / Video Frame with Dynamic Aspect Ratio & Smooth Hover Scale */}
      <div
        ref={containerRef}
        className={`relative w-full max-w-[340px] overflow-hidden rounded-[2rem] bg-[#FFF0EB] border border-[#1B4083]/10 shadow-lg transition-all duration-500 group-hover:shadow-2xl cursor-none ${item.aspectClass || 'aspect-[1.3]'}`}
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

        {/* Custom Hover Cursor */}
        {item.video && (
          <div
            className="pointer-events-none absolute z-20 flex h-16 w-16 items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white font-medium tracking-wide transition-opacity duration-300 shadow-lg"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              transform: "translate(-50%, -50%)",
              opacity: isHovered ? 1 : 0,
            }}
          >
            Play
          </div>
        )}

        {/* Mute/Unmute Toggle */}
        {item.video && (
          <button
            onClick={toggleMute}
            className={`absolute bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
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
      </div>

      {/* Title & Description */}
      <div className="mt-6">
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1B4083] transition-colors group-hover:text-[#0F2753]">
          {item.title}
        </h3>
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
    <section id="collection" className="relative py-24 sm:py-36 text-[#1B4083]">
      <div className="container-modular max-w-7xl">
        {/* Header Intro Section */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-[#FFC8D4] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#1B4083] mb-4">
            Curated Showcase
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B4083]">
            Jewellery crafted for stories that endure.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#1B4083]/80 leading-relaxed">
            Every piece in our studio begins with a personal memory. Explore our signature bespoke commissions, modular charm bars, and artisan-cast earrings.
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
            <span>Book a private styling session</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC8D4] text-[#1B4083]">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
