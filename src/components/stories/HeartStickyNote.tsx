"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { StoryItem } from "@/data/storiesData";

interface HeartStickyNoteProps {
  story: StoryItem;
  zIndex: number;
  isMobile?: boolean;
  onSelect: (story: StoryItem) => void;
  onBringToFront: (id: string) => void;
}

export default function HeartStickyNote({
  story,
  zIndex,
  isMobile = false,
  onSelect,
  onBringToFront,
}: HeartStickyNoteProps) {
  const isDraggingRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive note sizing optimized for handwritten 4-5 word quote legibility
  const sizeConfig = {
    compact: {
      widthClass: "w-[152px] sm:w-[172px] md:w-[188px]",
      fontSize: "text-[12.5px] sm:text-[14px] md:text-[15px]",
    },
    medium: {
      widthClass: "w-[172px] sm:w-[196px] md:w-[214px]",
      fontSize: "text-[13.5px] sm:text-[15px] md:text-[16.5px]",
    },
    large: {
      widthClass: "w-[192px] sm:w-[220px] md:w-[240px]",
      fontSize: "text-[14.5px] sm:text-[16px] md:text-[17.5px]",
    },
  }[story.size];

  const leftPct = isMobile ? story.mobileXPct : story.xPct;
  const topPct = isMobile ? story.mobileYPct : story.yPct;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        transition: { duration: 0.18 },
      }}
      whileDrag={{
        scale: 1.09,
        cursor: "grabbing",
        transition: { duration: 0.08 },
      }}
      onDragStart={() => {
        isDraggingRef.current = true;
        onBringToFront(story.id);
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 90);
      }}
      onClick={() => {
        if (!isDraggingRef.current) {
          onBringToFront(story.id);
          onSelect(story);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        zIndex: zIndex,
        position: "absolute",
        left: `${leftPct}%`,
        top: `${topPct}%`,
        rotate: `${story.rotation}deg`,
        touchAction: "none",
      }}
      className={`group cursor-grab active:cursor-grabbing select-none ${sizeConfig.widthClass} aspect-[100/90]`}
      aria-label={`Story review note by ${story.author}`}
    >
      {/* Container with tactile drop shadow on the wall */}
      <div className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.13)] transition-all duration-300 group-hover:drop-shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
        
        {/* Realistic High-Gloss Round Pushpin Pinning Note to Wall */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
          {/* Soft pinhole wall shadow underneath */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/35 rounded-full blur-[1px]" />

          {/* Realistic Metallic Needle Shaft */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-gradient-to-b from-[#8E8E93] via-[#D1D1D6] to-[#48484A] rounded-b-xs shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />

          {/* High-Gloss Spherical Dome Pushpin Head */}
          <div
            className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-transform duration-200 group-hover:scale-110"
            style={{
              background:
                story.color.pin === "blue"
                  ? "radial-gradient(circle at 35% 28%, #BFDBFE 0%, #3B82F6 30%, #1B4083 72%, #0A1B38 100%)"
                  : "radial-gradient(circle at 35% 28%, #FFFFFF 0%, #FFC8D4 32%, #F472B6 72%, #831843 100%)",
            }}
          >
            {/* Curved Specular White Glare */}
            <div className="absolute top-1 left-1.5 w-2 h-1 sm:w-2.5 sm:h-1.5 bg-white/95 rounded-full rotate-[-30deg] blur-[0.2px]" />
            {/* Bottom ambient highlight */}
            <div className="absolute bottom-0.5 right-1 w-1.5 h-0.5 bg-white/30 rounded-full blur-[0.4px]" />
          </div>
        </div>

        {/* Clean Solid SVG Heart Silhouette (Fully rounded lobes with top headroom) */}
        <svg
          viewBox="0 -3 100 92"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible transition-transform duration-300 group-hover:scale-[1.01]"
        >
          <path
            d="M 50,85 C 18,58 3,38 3,21 C 3,7 14,0 28,0 C 37,0 45,5 50,13 C 55,5 63,0 72,0 C 86,0 97,7 97,21 C 97,38 82,58 50,85 Z"
            fill={story.color.bg}
            stroke={story.color.border}
            strokeWidth="1.2"
          />
        </svg>

        {/* Safe Inner Geometric Region strictly positioned in the upper bulbous area */}
        <div className="absolute inset-x-0 top-[17%] bottom-[22%] z-10 flex items-center justify-center px-4 sm:px-5 pointer-events-none">
          {/* Punchy 4-5 Word Handwritten Review Quote with Assigned Font */}
          <p
            className={`leading-[1.2] tracking-wide text-center select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)] max-w-[84%] ${sizeConfig.fontSize} ${
              story.font === "estonia"
                ? "font-estonia font-normal text-[1.48em] tracking-wide"
                : story.font === "indieflower"
                ? "font-indieflower font-normal text-[1.02em]"
                : "font-caveat font-medium text-[1.14em]"
            }`}
            style={{ color: story.color.text }}
          >
            “{story.quote}”
          </p>
        </div>

        {/* Subtle 'Read story ✦' cue on hover near the bottom tip */}
        <div
          className={`absolute bottom-2 sm:bottom-2.5 z-10 text-[7px] sm:text-[8px] tracking-widest uppercase font-sans font-bold transition-opacity duration-200 pointer-events-none ${
            isHovered ? "opacity-90" : "opacity-0"
          }`}
          style={{ color: story.color.text }}
        >
          Read story ✦
        </div>

      </div>
    </motion.div>
  );
}
