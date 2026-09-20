"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { StoryItem } from "@/data/storiesData";

interface StoryModalProps {
  story: StoryItem | null;
  onClose: () => void;
}

export default function StoryModal({ story, onClose }: StoryModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!story) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [story, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {story && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto p-4 select-none">
          {/* Backdrop with frosted glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1832]/50 backdrop-blur-[6px] cursor-pointer"
            aria-hidden="true"
          />

          {/* Heart-Shaped Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 25, rotate: story.rotation }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.65, y: 25 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 26,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-[94vw] max-w-[440px] sm:max-w-[480px] aspect-[100/90] flex items-center justify-center filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.38)]"
          >
            {/* Realistic High-Gloss Round Pushpin on Modal */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center">
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/40 rounded-full blur-[1.5px]" />
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-b from-[#8E8E93] via-[#D1D1D6] to-[#48484A] rounded-b-xs shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />
              <div
                className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-[0_5px_12px_rgba(0,0,0,0.4),inset_0_-2px_5px_rgba(0,0,0,0.35)]"
                style={{
                  background:
                    story.color.pin === "blue"
                      ? "radial-gradient(circle at 35% 28%, #BFDBFE 0%, #3B82F6 30%, #1B4083 72%, #0A1B38 100%)"
                      : "radial-gradient(circle at 35% 28%, #FFFFFF 0%, #FFC8D4 32%, #F472B6 72%, #831843 100%)",
                }}
              >
                <div className="absolute top-1.5 left-2 w-3 h-1.5 bg-white/95 rounded-full rotate-[-30deg] blur-[0.2px]" />
                <div className="absolute bottom-1 right-1.5 w-2 h-0.5 bg-white/30 rounded-full blur-[0.4px]" />
              </div>
            </div>

            {/* SVG Heart Silhouette Background (Fully rounded lobes with top headroom) */}
            <svg
              viewBox="0 -3 100 92"
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            >
              <path
                d="M 50,85 C 18,58 3,38 3,21 C 3,7 14,0 28,0 C 37,0 45,5 50,13 C 55,5 63,0 72,0 C 86,0 97,7 97,21 C 97,38 82,58 50,85 Z"
                fill={story.color.bg}
                stroke={story.color.border}
                strokeWidth="1.6"
              />
            </svg>

            {/* Close Button ('✕') */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close story"
              className="absolute top-7 right-8 sm:top-9 sm:right-11 z-40 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-black/15 hover:bg-black/25 active:scale-90 transition-all duration-200"
              style={{ color: story.color.text }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Heart Inner Content (Spacious layout with stars & badge removed) */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-7 sm:px-11 pt-8 sm:pt-12 pb-8 sm:pb-10 w-full max-w-[88%]">
              {/* Full Story Quote */}
              <p
                className="font-serif italic text-[13.5px] sm:text-[15px] md:text-[16px] leading-relaxed mb-3.5 max-w-[320px] sm:max-w-[370px] select-text"
                style={{ color: story.color.text }}
              >
                “{story.story}”
              </p>

              {/* By Whom: Author & Milestone */}
              <div
                className="flex flex-col items-center border-t pt-2.5 w-full max-w-[240px]"
                style={{
                  borderColor: story.isBlue ? "rgba(255, 200, 212, 0.35)" : "rgba(27, 64, 131, 0.25)",
                }}
              >
                <span
                  className="font-display font-bold text-sm sm:text-base tracking-tight"
                  style={{ color: story.color.text }}
                >
                  {story.author}
                </span>
                <span
                  className="text-[10px] sm:text-[11px] uppercase tracking-wider opacity-85 mt-0.5"
                  style={{ color: story.color.text }}
                >
                  {story.roleOrBadge} • {story.date}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
