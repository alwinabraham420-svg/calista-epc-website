"use client";

import React from "react";

interface HeroVerticalIndicatorProps {
  className?: string;
}

export const HeroVerticalIndicator: React.FC<HeroVerticalIndicatorProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`hidden lg:flex flex-col items-center select-none z-20 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* 01 with blue underline */}
      <div className="flex flex-col items-center mb-2.5">
        <span className="text-[13px] sm:text-[14px] font-bold tracking-wider text-[#005BA4] font-mono">
          01
        </span>
        <div className="w-5 h-[2px] bg-[#005BA4] mt-0.5" />
      </div>

      {/* Vertical Track with Dots */}
      <div className="relative w-[1.5px] h-24 bg-gray-300/80 my-2 flex flex-col items-center justify-between py-1">
        <span className="w-2 h-2 rounded-full bg-[#005BA4]" />
        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 bg-white" />
        <span className="w-1.5 h-1.5 rounded-full border border-gray-400 bg-white" />
      </div>

      {/* Vertical text: SCROLL TO BUILD */}
      <div className="mt-8 flex items-center justify-center">
        <div className="rotate-90 origin-center whitespace-nowrap flex items-center gap-1.5 text-[8.5px] tracking-[0.22em] uppercase font-sans font-semibold text-gray-400/90">
          <span>SCROLL TO BUILD</span>
          <span className="text-[10px] -rotate-90 inline-block opacity-80">💡</span>
        </div>
      </div>
    </div>
  );
};
