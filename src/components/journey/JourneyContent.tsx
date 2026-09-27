"use client";

import React from "react";
import { Play, Compass, Settings, ShieldCheck } from "lucide-react";

interface JourneyContentProps {
  onWatchProcess?: () => void;
}

export const JourneyContent: React.FC<JourneyContentProps> = ({
  onWatchProcess,
}) => {
  return (
    <div className="flex flex-col select-none text-left w-full max-w-[440px] xl:max-w-[460px]">
      {/* Eyebrow Label with small blue line */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-[1.5px] bg-[#005BA4]" />
        <span className="text-[10.5px] sm:text-[11.5px] font-mono tracking-[0.24em] text-gray-500 font-bold uppercase">
          THE CONSTRUCTION JOURNEY
        </span>
      </div>

      {/* Main Serif Heading: From Vision to Reality */}
      <h2 className="font-serif text-[44px] sm:text-[54px] lg:text-[58px] xl:text-[66px] leading-[0.94] tracking-[-0.025em] font-medium mb-5">
        <span className="text-[#111827] block">From Vision</span>
        <span className="text-[#005BA4] block mt-1">to Reality</span>
      </h2>

      {/* Supporting Editorial Paragraphs */}
      <div className="space-y-2 mb-8 max-w-[400px]">
        <p className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] font-sans text-gray-600 font-normal leading-[1.6]">
          Experience the journey of a home coming to life.
        </p>
        <p className="text-[13px] sm:text-[13.5px] font-sans text-gray-400 font-normal leading-[1.6]">
          Scroll to see how we transform your vision into a beautifully crafted reality.
        </p>
      </div>

      {/* Watch Full Process Button (Subtle Glassmorphic Play Button) */}
      <div className="mb-9 lg:mb-11">
        <button
          type="button"
          onClick={onWatchProcess}
          className="group inline-flex items-center gap-4 text-[#374151] hover:text-[#005BA4] transition-all duration-300 focus:outline-none"
          aria-label="Watch Full Process Video"
        >
          {/* Circular Play Button with subtle glass styling */}
          <div
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#005BA4]/80 flex items-center justify-center text-[#005BA4] shadow-[0_4px_16px_rgba(0,91,164,0.12)] group-hover:scale-105 group-hover:bg-[#005BA4] group-hover:text-white group-hover:border-[#005BA4] transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-current ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
          <span className="text-[14.5px] sm:text-[15px] font-sans font-medium tracking-tight text-[#111827] group-hover:text-[#005BA4] transition-colors">
            Watch Full Process
          </span>
        </button>
      </div>

      {/* Bottom Features Row (3 columns with clean divider lines) */}
      <div className="grid grid-cols-3 pt-6 lg:pt-7 border-t border-gray-200/80 w-full">
        {/* Feature 1 */}
        <div className="flex flex-col items-start pr-3">
          <Compass className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 stroke-[1.5] mb-2.5 lg:mb-3" />
          <span className="text-[12px] sm:text-[13px] lg:text-[13.5px] font-sans font-medium text-[#374151] leading-tight">
            Thoughtful Design
          </span>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-start px-3 lg:px-4 border-l border-gray-200">
          <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 stroke-[1.5] mb-2.5 lg:mb-3" />
          <span className="text-[12px] sm:text-[13px] lg:text-[13.5px] font-sans font-medium text-[#374151] leading-tight">
            Quality Construction
          </span>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-start pl-3 lg:pl-4 border-l border-gray-200">
          <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 stroke-[1.5] mb-2.5 lg:mb-3" />
          <span className="text-[12px] sm:text-[13px] lg:text-[13.5px] font-sans font-medium text-[#374151] leading-tight">
            Lasting Value
          </span>
        </div>
      </div>
    </div>
  );
};
