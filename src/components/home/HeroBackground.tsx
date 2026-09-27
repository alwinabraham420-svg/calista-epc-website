"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

interface HeroBackgroundProps {
  imageRef?: React.RefObject<HTMLDivElement>;
  overlayRef?: React.RefObject<HTMLDivElement>;
  foregroundRef?: React.RefObject<HTMLDivElement>;
}

export const HeroBackground = forwardRef<HTMLDivElement, HeroBackgroundProps>(
  ({ imageRef, overlayRef, foregroundRef }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
      >
        {/* Main Architectural Villa Scene (Middleground & Sky) */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/home/calista-hero.jpg"
            alt="Calista EPC Contemporary Kerala Villa Architecture"
            fill
            priority
            unoptimized
            quality={100}
            className="object-cover object-[50%_bottom] w-full h-full [image-rendering:-webkit-optimize-contrast]"
            sizes="100vw"
          />
        </div>

        {/* Top subtle wash for navbar readability only */}
        <div
          ref={overlayRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/25 via-white/5 to-transparent pointer-events-none" />
        </div>

        {/* Foreground Framing Anchor (Clean without blur filter) */}
        <div
          ref={foregroundRef}
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
        />
      </div>
    );
  }
);

HeroBackground.displayName = "HeroBackground";
