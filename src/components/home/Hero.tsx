"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroStats } from "./HeroStats";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import { HeroVerticalIndicator } from "./HeroVerticalIndicator";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // ── Initial states ──
        gsap.set(".hero-line", { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" });
        gsap.set(".hero-eyebrow", { y: 15, opacity: 0 });
        gsap.set(".hero-desc", { y: 20, opacity: 0 });
        gsap.set(".hero-cta", { y: 20, opacity: 0 });
        gsap.set(".hero-anim-stat", { y: 15, opacity: 0 });
        gsap.set(imageRef.current, { opacity: 0 });
        gsap.set(".hero-anim-indicator", { opacity: 0 });

        // ── Staggered entrance timeline ──
        const tl = gsap.timeline({ delay: 0.2 });

        // Image reveals first with pure opacity to preserve 100% pixel sharpness
        tl.to(imageRef.current, {
          opacity: 1,
          duration: 1.6,
          ease: "power2.out",
        });

        // Eyebrow
        tl.to(
          ".hero-eyebrow",
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=1.2"
        );

        // Headline lines — staggered clip reveal
        tl.to(
          ".hero-line",
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.8"
        );

        // Description
        tl.to(
          ".hero-desc",
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );

        // CTAs
        tl.to(
          ".hero-cta",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );

        // Stats
        tl.to(
          ".hero-anim-stat",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        );

        // Indicators
        tl.to(
          ".hero-anim-indicator",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );

        // ── Parallax on scroll ──
        // Background image moves with smooth vertical parallax (pure translation without scale blur)
        gsap.to(imageRef.current, {
          y: 90,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        // Content fades out and moves up faster
        gsap.to(contentRef.current, {
          y: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "20% top",
            end: "80% top",
            scrub: 0.3,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[100svh] bg-white flex flex-col justify-center overflow-hidden"
      aria-label="Calista EPC Hero Section"
    >
      {/* Layered Architectural Visual Background */}
      <HeroBackground imageRef={imageRef} />

      {/* Main Hero Container Grid */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-24 sm:pt-28 pb-6 flex-1 flex flex-col justify-between pointer-events-none"
      >
        {/* Middle Row: Left Vertical Indicator + Hero Content */}
        <div className="flex items-start gap-6 sm:gap-10 xl:gap-14 my-auto mt-2 sm:mt-4 mb-2">
          {/* Left Vertical Indicator Rail */}
          <div className="shrink-0 hero-anim-indicator pt-1.5 sm:pt-2">
            <HeroVerticalIndicator />
          </div>

          {/* Main Editorial Content */}
          <div className="pointer-events-auto flex-1">
            <HeroContent />
          </div>

          {/* Architectural badge on the right */}
          <div className="hidden lg:flex hero-anim-indicator flex-col items-start px-3 py-2 rounded glass-dark text-white shadow-md pointer-events-auto select-none mt-20 xl:mt-24 mr-4 self-end">
            <span className="text-[9px] font-bold tracking-[0.22em] uppercase leading-tight text-white">
              MODERN LIVING
            </span>
            <span className="text-[8.5px] font-medium tracking-[0.22em] uppercase leading-tight text-white/80 mt-0.5">
              TIMELESS VALUES
            </span>
          </div>
        </div>

        {/* Lower Row: Verified Statistics & Bottom Scroll Indicator */}
        <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pt-2 pb-2">
          {/* Lower Statistics Row */}
          <div className="pointer-events-auto">
            <HeroStats />
          </div>

          {/* Bottom Center Scroll to Explore Indicator */}
          <div className="w-full md:w-auto flex justify-center pb-1 pointer-events-auto hero-anim-indicator md:absolute md:left-[55%] md:-translate-x-1/2 md:bottom-2">
            <HeroScrollIndicator />
          </div>

          {/* Empty balance spacer for layout symmetry */}
          <div className="hidden xl:block w-32 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
