"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INSTAGRAM_URL = "https://www.instagram.com/calista_epc/";
const INSTAGRAM_HANDLE = "@calista_epc";

// Minimal editorial Instagram outline icon conforming to Calista EPC visual identity
const InstagramOutlineIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

export const InstagramSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const visualColRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLAnchorElement>(null);
  const handleRef = useRef<HTMLAnchorElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const blueprintSvgRef = useRef<SVGSVGElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // In reduced motion mode, show elements immediately without animation lag
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Staggered reveal sequence for the editorial text block
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      textTimeline
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        )
        .fromTo(
          numberRef.current,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          iconRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.15"
        )
        .fromTo(
          handleRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.25"
        );

      // 2. Architectural visual reveal
      gsap.fromTo(
        imageFrameRef.current,
        {
          opacity: 0,
          scale: 1.05,
          clipPath: "inset(8% 8% 8% 8% round 16px)",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // 3. Blueprint lines & CAD annotations reveal
      if (blueprintSvgRef.current) {
        gsap.fromTo(
          blueprintSvgRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            delay: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }

      // 4. Subtle Parallax Effect on Scroll
      // Blueprint elements move slightly slower; Image has subtle counter-translation
      if (visualColRef.current && blueprintSvgRef.current) {
        gsap.to(blueprintSvgRef.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(imageFrameRef.current, {
          y: 16,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // 5. Floating badge reveal
      if (floatingBadgeRef.current) {
        gsap.fromTo(
          floatingBadgeRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="relative w-full py-24 sm:py-32 lg:py-36 xl:py-44 bg-[#FAFAFA] border-t border-gray-100/90 overflow-hidden"
      aria-label="Calista EPC Social and Instagram Journey"
    >
      {/* Subtle architectural dot grid background at low opacity */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(#005BA4 1px, transparent 1px), radial-gradient(#005BA4 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* ══════════════════════════════════════════════════════
              LEFT COLUMN: EDITORIAL INVITATION (Approx 42%)
             ══════════════════════════════════════════════════════ */}
          <div
            ref={contentColRef}
            className="lg:col-span-5 flex flex-col justify-center max-w-xl lg:max-w-none"
          >
            {/* Section Eyebrow: Technical Uppercase Monospace */}
            <div ref={eyebrowRef} className="mb-2">
              <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.25em] text-[#005BA4] font-semibold uppercase block">
                FOLLOW THE JOURNEY
              </span>
            </div>

            {/* Number 10 with thin horizontal connector line */}
            <div
              ref={numberRef}
              className="flex items-center gap-3 mb-8 sm:mb-10"
              aria-label="Section 10"
            >
              <span className="w-10 sm:w-14 h-[1px] bg-[#005BA4]/40" />
              <span className="font-mono text-[13px] sm:text-[14px] font-bold tracking-wider text-[#005BA4]">
                10
              </span>
            </div>

            {/* Instagram Outline Icon in subtle circular badge */}
            <div className="mb-6 sm:mb-8">
              <a
                ref={iconRef}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="cta"
                className="group relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-[#005BA4]/20 text-[#005BA4] shadow-[0_4px_20px_rgba(0,91,164,0.06)] hover:shadow-[0_8px_28px_rgba(0,91,164,0.16)] hover:border-[#005BA4]/45 hover:scale-105 transition-all duration-300"
                aria-label="Visit Calista EPC on Instagram"
              >
                <InstagramOutlineIcon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">Instagram Profile</span>
              </a>
            </div>

            {/* Primary Visual Element: Instagram Username in Editorial Serif */}
            <div className="mb-3">
              <a
                ref={handleRef}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="cta"
                className="group inline-flex items-center text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[64px] font-serif font-bold text-[#005BA4] hover:text-[#00457A] tracking-tight leading-[1.04] transition-colors"
              >
                <span className="relative">
                  {INSTAGRAM_HANDLE}
                  <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-[#005BA4]/40 group-hover:w-full transition-all duration-300 ease-out" />
                </span>
              </a>
            </div>

            {/* Supporting Text */}
            <p
              ref={descRef}
              className="font-sans text-[18px] sm:text-[20px] lg:text-[22px] font-light text-gray-500 tracking-wide leading-relaxed mb-8 sm:mb-10"
            >
              Building spaces. Sharing stories.
            </p>

            {/* CTA Group: Primary Pill Button & Secondary Underline Link */}
            <div
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2"
            >
              {/* Primary Pill Button */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="cta"
                className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-4 rounded-full bg-[#005BA4] hover:bg-[#00457A] text-white font-sans text-[14px] sm:text-[15px] font-medium shadow-[0_8px_24px_rgba(0,91,164,0.22)] hover:shadow-[0_12px_32px_rgba(0,91,164,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none"
              >
                <InstagramOutlineIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Follow on Instagram</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Subtle Brand Message Note */}
            <div className="mt-10 sm:mt-12 pt-6 border-t border-gray-200/60 flex items-center gap-3 text-[12px] font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>We don&apos;t just build spaces. We document the journey.</span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              RIGHT COLUMN: ARCHITECTURAL HERO VISUAL (Approx 58%)
             ══════════════════════════════════════════════════════ */}
          <div
            ref={visualColRef}
            className="lg:col-span-7 relative w-full flex items-center justify-center"
          >
            {/* Architectural Blueprint Line Overlay Container */}
            <div className="relative w-full">
              {/* SVG Blueprint Geometry & Technical Cad Overlays */}
              <svg
                ref={blueprintSvgRef}
                className="absolute -inset-6 sm:-inset-8 lg:-inset-10 w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] lg:w-[calc(100%+5rem)] h-[calc(100%+3rem)] sm:h-[calc(100%+4rem)] lg:h-[calc(100%+5rem)] pointer-events-none z-10 select-none"
                viewBox="0 0 800 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Outer Cad Border & Corner Registration Marks */}
                <path
                  d="M 20 20 L 60 20 M 20 20 L 20 60"
                  stroke="#005BA4"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />
                <path
                  d="M 780 20 L 740 20 M 780 20 L 780 60"
                  stroke="#005BA4"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />
                <path
                  d="M 20 580 L 60 580 M 20 580 L 20 540"
                  stroke="#005BA4"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />
                <path
                  d="M 780 580 L 740 580 M 780 580 L 780 540"
                  stroke="#005BA4"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />

                {/* Construction Datum Lines */}
                <line
                  x1="15"
                  y1="120"
                  x2="785"
                  y2="120"
                  stroke="#005BA4"
                  strokeWidth="0.8"
                  strokeDasharray="4 6"
                  strokeOpacity="0.22"
                />
                <line
                  x1="15"
                  y1="490"
                  x2="785"
                  y2="490"
                  stroke="#005BA4"
                  strokeWidth="0.8"
                  strokeDasharray="4 6"
                  strokeOpacity="0.22"
                />
                <line
                  x1="140"
                  y1="15"
                  x2="140"
                  y2="585"
                  stroke="#005BA4"
                  strokeWidth="0.8"
                  strokeDasharray="4 6"
                  strokeOpacity="0.22"
                />
                <line
                  x1="670"
                  y1="15"
                  x2="670"
                  y2="585"
                  stroke="#005BA4"
                  strokeWidth="0.8"
                  strokeDasharray="4 6"
                  strokeOpacity="0.22"
                />

                {/* Dimension Line with Tick Marks: Width 18.40m */}
                <g opacity="0.45">
                  <line
                    x1="140"
                    y1="60"
                    x2="670"
                    y2="60"
                    stroke="#005BA4"
                    strokeWidth="1"
                  />
                  <line
                    x1="140"
                    y1="52"
                    x2="140"
                    y2="68"
                    stroke="#005BA4"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="670"
                    y1="52"
                    x2="670"
                    y2="68"
                    stroke="#005BA4"
                    strokeWidth="1.2"
                  />
                  <text
                    x="405"
                    y="52"
                    textAnchor="middle"
                    fill="#005BA4"
                    fontSize="10"
                    fontFamily="monospace"
                    letterSpacing="0.1em"
                  >
                    DIM: 18.40m [STRUCTURAL AXIS]
                  </text>
                </g>

                {/* Elevation Datum Marker: LVL +3.40m */}
                <g opacity="0.5">
                  <path
                    d="M 680 120 L 700 120 L 690 105 Z"
                    fill="none"
                    stroke="#005BA4"
                    strokeWidth="1"
                  />
                  <text
                    x="710"
                    y="118"
                    fill="#005BA4"
                    fontSize="9.5"
                    fontFamily="monospace"
                    letterSpacing="0.08em"
                  >
                    ▽ +3.40m ROOF OVERHANG
                  </text>
                </g>

                {/* Ground Level Datum: LVL +0.00m */}
                <g opacity="0.5">
                  <path
                    d="M 680 490 L 700 490 L 690 475 Z"
                    fill="none"
                    stroke="#005BA4"
                    strokeWidth="1"
                  />
                  <text
                    x="710"
                    y="488"
                    fill="#005BA4"
                    fontSize="9.5"
                    fontFamily="monospace"
                    letterSpacing="0.08em"
                  >
                    ▽ +0.00m FINISH FLOOR
                  </text>
                </g>

                {/* Subtle Geometric Compass Arc */}
                <circle
                  cx="140"
                  cy="120"
                  r="24"
                  stroke="#005BA4"
                  strokeWidth="0.75"
                  strokeDasharray="2 3"
                  strokeOpacity="0.25"
                />
                <circle
                  cx="140"
                  cy="120"
                  r="2"
                  fill="#005BA4"
                  fillOpacity="0.5"
                />

                {/* Grid Coordinates Label */}
                <text
                  x="30"
                  y="570"
                  fill="#64748B"
                  fontSize="9"
                  fontFamily="monospace"
                  letterSpacing="0.12em"
                  opacity="0.6"
                >
                  SEC: 10-SOC // KERALA [09°29′N, 76°20′E]
                </text>
              </svg>

              {/* Architectural Image Hero Frame */}
              <div
                ref={imageFrameRef}
                className="group relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-200/80 bg-gray-100"
              >
                <Image
                  src="/images/instagram/calista-architectural-visual.jpg"
                  alt="Calista EPC contemporary luxury architectural residence with modern concrete, wood slats, and tranquil reflective pool"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 55vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                  priority={false}
                />

                {/* Subtle vignette and protective gradient for the floating badge */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Subtle Glassmorphism Badge: Architectural Identification */}
                <div
                  ref={floatingBadgeRef}
                  className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center gap-2.5 text-[10.5px] sm:text-[11px] font-mono tracking-wider text-gray-800 uppercase pointer-events-none select-none"
                >
                  <span className="w-2 h-2 rounded-full bg-[#8DC63F] shadow-[0_0_6px_#8DC63F]" />
                  <span className="font-bold text-[#005BA4]">CALISTA EPC</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-600 font-medium">
                    ARCHITECTURAL EXCELLENCE
                  </span>
                </div>

                {/* Link to Instagram overlay if clicked */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="cta"
                  className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-[#005BA4]"
                  aria-label="View architectural photography on Calista EPC Instagram"
                >
                  <span className="sr-only">Visit @calista_epc on Instagram</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
