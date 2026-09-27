"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface ExplodedHouseProps {
  progress?: number;
}

export const ExplodedHouse: React.FC<ExplodedHouseProps> = ({ progress = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle restrained parallax translate based on scroll progress (10-25px max, calm)
  const translateY = (progress - 0.5) * -30;
  const subtleScale = 1 + (progress - 0.5) * 0.02;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[460px] aspect-[4/5] flex items-center justify-center select-none"
    >
      {/* Blueprint elevation circle & guide rings behind the house */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] rounded-full border border-sky-100/70 border-dashed" />
        <div className="absolute w-[440px] h-[440px] rounded-full border border-sky-50" />
      </div>

      {/* Central Architectural House Visual (Calm, photorealistic, matching reference) */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${subtleScale})`,
        }}
      >
        <div className="relative w-[340px] sm:w-[380px] md:w-[410px] h-[420px] sm:h-[470px]">
          <Image
            src="/images/journey/house-exploded-full.png"
            alt="Calista EPC Architectural Construction Design"
            fill
            sizes="(max-width: 768px) 340px, 410px"
            className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.06)]"
            priority
          />
        </div>
      </div>
    </div>
  );
};
