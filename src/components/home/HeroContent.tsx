"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

interface HeroContentProps {
  className?: string;
  onPlayClick?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  className = "",
  onPlayClick,
}) => {
  return (
    <div
      className={`flex flex-col items-start max-w-2xl text-left z-20 ${className}`}
    >
      {/* Eyebrow */}
      <div className="hero-eyebrow flex items-center gap-2 mb-3.5 sm:mb-5">
        <div className="w-6 h-[1.5px] bg-[#005BA4]" />
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase text-gray-500 font-sans">
          CONSTRUCTION COMPANY IN KERALA
        </span>
      </div>

      {/* Main H1 Headline — Each line animates independently */}
      <h1 className="text-[42px] xs:text-[48px] sm:text-[60px] md:text-[72px] lg:text-[84px] xl:text-[96px] text-[#111827] font-serif font-bold tracking-[-0.03em] leading-[1.05] sm:leading-[1] mb-5 sm:mb-6">
        <span className="hero-line block overflow-hidden">
          <span className="block">BUILDING</span>
        </span>
        <span className="hero-line block overflow-hidden">
          <span className="block">SPACES.</span>
        </span>
        <span className="hero-line block overflow-hidden text-[#005BA4]">
          <span className="block">BUILT TO LAST.</span>
        </span>
      </h1>

      {/* Supporting Copy */}
      <div className="hero-desc max-w-[500px] text-gray-700 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.65] font-sans font-normal mb-7 sm:mb-9 space-y-1">
        <p>Your one-stop construction solution in Alappuzha & across Kerala.</p>
        <p>
          Transforming visions into{" "}
          <span className="text-gray-950 font-semibold underline decoration-gray-400 underline-offset-4">
            exceptional spaces
          </span>{" "}
          for over 15 years.
        </p>
      </div>

      {/* Action Buttons — Matching Reference Design */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 sm:gap-4">
        {/* Primary CTA */}
        <Link
          href="#projects"
          className="hero-cta btn-premium inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-[#005BA4] hover:bg-[#004780] text-white text-[13px] sm:text-[14px] font-semibold tracking-normal shadow-md hover:shadow-lg transition-all duration-300 group shrink-0"
          data-cursor="cta"
        >
          <span>Explore Our Projects</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>

        {/* Secondary CTA — White rounded-lg button */}
        <a
          href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta btn-premium inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-white hover:bg-gray-50 text-gray-800 text-[13px] sm:text-[14px] font-semibold border border-gray-300/80 hover:border-gray-400 shadow-sm hover:shadow transition-all duration-300 shrink-0"
          data-cursor="cta"
        >
          <span>Start Your Project</span>
        </a>

        {/* Circular Play Button — Matching reference image */}
        <a
          href="#construction-journey"
          className="hero-cta w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gray-50 border border-gray-300/80 shadow-sm hover:shadow flex items-center justify-center text-gray-900 hover:text-[#005BA4] transition-all duration-300 shrink-0 group"
          aria-label="Watch Construction Journey"
          data-cursor="cta"
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5 transition-transform duration-300 group-hover:scale-110" />
        </a>
      </div>
    </div>
  );
};
