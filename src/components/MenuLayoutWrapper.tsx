"use client";

import { ReactNode, useEffect, useState } from "react";
import { useMenu } from "./MenuContext";
import OffCanvasMenu from "./OffCanvasMenu";

export default function MenuLayoutWrapper({ children }: { children: ReactNode }) {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum distance (in px) to trigger swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && !isMenuOpen) {
      setIsMenuOpen(true);
    }
    if (isRightSwipe && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Optionally set body background to black to prevent white flashes during 3D transform
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.backgroundColor = "#000";
    } else {
      setTimeout(() => {
        document.body.style.backgroundColor = "";
      }, 500); // Wait for transition
    }
  }, [isMenuOpen]);

  return (
    <div 
      className="relative w-full min-h-screen bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndEvent}
    >
      
      {/* Transform Wrapper for Main Content */}
      <div 
        className="w-full min-h-screen bg-[#FAF6F0] z-20 relative shadow-2xl"
        style={{
          transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1), border-radius 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
          transformOrigin: "top right",
          transform: isMenuOpen 
            ? "translateX(-15vw) translateY(12vh) rotate(14deg)" 
            : "none",
          borderRadius: isMenuOpen ? "2rem" : "0px"
        }}
      >
        {/* We need to allow clicks on the header when the menu is open, so we use an overlay that covers everything EXCEPT the header (which is fixed z-[100]) */}
        <div 
          className="absolute inset-0 bg-black z-[99] transition-opacity duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer"
          style={{ opacity: isMenuOpen ? 0.3 : 0, pointerEvents: isMenuOpen ? "auto" : "none" }}
          onClick={() => { if (isMenuOpen) { document.querySelector('button[aria-label="Toggle Menu"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })); } }}
        />
        {children}
      </div>

      {/* The Menu Panel sitting underneath */}
      <OffCanvasMenu />
      
    </div>
  );
}
