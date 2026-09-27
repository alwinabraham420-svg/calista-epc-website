"use client";

import React, { useEffect, useState, useCallback } from "react";

interface HeroScrollIndicatorProps {
  className?: string;
}

export const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = ({
  className = "",
}) => {
  const [opacity, setOpacity] = useState(1);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Fade out between 50px and 300px of scroll
    const newOpacity = Math.max(0, 1 - scrollY / 250);
    setOpacity(newOpacity);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={handleScrollClick}
      className={`flex flex-col items-center justify-center cursor-pointer select-none group transition-opacity duration-300 ${className}`}
      style={{ opacity }}
      aria-label="Scroll down to explore"
    >
      {/* Premium mouse icon with animated dot */}
      <div className="w-[20px] h-[32px] rounded-full border-[1.5px] border-white/80 bg-black/10 backdrop-blur-[2px] p-0.5 flex justify-center items-start mb-1.5 transition-colors group-hover:border-[#005BA4] shadow-sm">
        <div className="w-[2.5px] h-[7px] rounded-full bg-white group-hover:bg-[#005BA4] transition-colors animate-scroll-dot mt-1" />
      </div>

      {/* Label */}
      <span className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.26em] font-bold text-white/90 group-hover:text-[#005BA4] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        SCROLL TO EXPLORE
      </span>
    </div>
  );
};
