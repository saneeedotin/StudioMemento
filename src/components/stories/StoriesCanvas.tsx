"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { STORIES_DATA, StoryItem } from "@/data/storiesData";
import HeartStickyNote from "@/components/stories/HeartStickyNote";
import StoryModal from "@/components/stories/StoryModal";

import AmbientBackground from "@/components/AmbientBackground";

export default function StoriesCanvas() {
  // Selected story for expanded reading modal
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  // Responsive mobile check to display curated top subset on small devices
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Z-Index Management (last clicked or dragged note stays on top)
  const [zIndices, setZIndices] = useState<{ [id: string]: number }>(() => {
    const initial: { [id: string]: number } = {};
    STORIES_DATA.forEach((s, idx) => {
      initial[s.id] = 10 + idx;
    });
    return initial;
  });
  const maxZRef = useRef(10 + STORIES_DATA.length);

  const bringToFront = useCallback((id: string) => {
    maxZRef.current += 1;
    setZIndices((prev) => ({
      ...prev,
      [id]: maxZRef.current,
    }));
  }, []);

  // Filter for mobile or full curated desktop set
  const displayedStories = isMobile
    ? STORIES_DATA.filter((s) => s.mobileFeatured)
    : STORIES_DATA;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF7F2] select-none">
      {/* ------------------------------------------------------------- */}
      {/* AMBIENT BACKGROUND GLOW SPHERES                               */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AmbientBackground variant="pink" className="w-full h-full">
          <div className="w-full h-full" />
        </AmbientBackground>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STATIC WALLPAPER PATTERN ("Whats your story?" - Whisper Light)*/}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055] mix-blend-multiply z-[1]"
        style={{
          backgroundImage: "url('/whats-your-story-seamless.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "1050px 580px",
          backgroundPosition: "center top",
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* STATIC PINNED STORIES BOARD (Unscrollable & Unmoveable)       */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full h-full overflow-hidden pointer-events-auto z-10">
        {displayedStories.map((story) => (
          <HeartStickyNote
            key={story.id}
            story={story}
            zIndex={zIndices[story.id] || 10}
            isMobile={isMobile}
            onSelect={setSelectedStory}
            onBringToFront={bringToFront}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MINIMALIST FLOATING HINT BADGE                                */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#1B4083]/12 shadow-[0_4px_18px_rgba(27,64,131,0.08)]">
        <span className="text-[#FF6B8B] text-xs">✦</span>
        <p className="text-xs sm:text-[13px] font-sans font-medium text-[#1B4083]/90 tracking-tight">
          Drag notes to arrange • Click any heart to read full story
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EXPANDED STORY READING MODAL                                  */}
      {/* ------------------------------------------------------------- */}
      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
}
