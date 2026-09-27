"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { JourneyContent } from "./JourneyContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ConstructionJourney: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Initial states — pure opacity and translation without scale distortion
        gsap.set(bgRef.current, { opacity: 0, y: 15 });
        gsap.set(rightColRef.current, { opacity: 0, x: 30 });

        // Scroll entrance reveal
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(bgRef.current, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power2.out",
            });
            tl.to(
              rightColRef.current,
              { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
              "-=0.6"
            );
          },
          once: true,
        });

        // Subtle background parallax on scroll
        gsap.to(bgRef.current, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="construction-journey"
        className="relative w-full min-h-[850px] lg:h-[100vh] xl:h-[105vh] max-h-[115vh] py-16 sm:py-20 lg:py-0 bg-[#06111D] border-t border-sky-950/60 overflow-hidden flex flex-col justify-center"
        aria-label="The Construction Journey — From Vision to Reality"
      >
        {/* ── Full-Width Premium Calista EPC Abstract Brand Gradient Background ── */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Multi-layered architectural brand gradient (Dark navy, Calista blue, Cyan glow, subtle Lime accent) */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 18% 25%, rgba(0, 174, 239, 0.22) 0%, rgba(0, 174, 239, 0.04) 42%, transparent 68%),
                radial-gradient(circle at 38% 52%, rgba(0, 91, 164, 0.48) 0%, rgba(0, 71, 128, 0.20) 48%, transparent 74%),
                radial-gradient(circle at 12% 82%, rgba(141, 198, 63, 0.11) 0%, rgba(141, 198, 63, 0.01) 32%, transparent 55%),
                radial-gradient(circle at 82% 48%, rgba(0, 91, 164, 0.30) 0%, rgba(10, 30, 52, 0.06) 45%, transparent 70%),
                linear-gradient(138deg, #05101A 0%, #091C30 38%, #071728 72%, #030A12 100%)
              `,
            }}
          />

          {/* Ultra-subtle architectural grid line texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #00AEEF 1px, transparent 1px),
                linear-gradient(to bottom, #00AEEF 1px, transparent 1px)
              `,
              backgroundSize: "54px 54px",
            }}
          />
        </div>

        {/* ── Main Container: Open Left/Center Area + Right Editorial Content ── */}
        <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 flex-1 flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
            
            {/* ── LEFT & CENTER: Unobstructed Architectural Visual Space ── */}
            <div
              className="w-full lg:w-[54%] xl:w-[58%] min-h-[240px] sm:min-h-[320px] lg:min-h-[500px] pointer-events-none select-none"
              aria-hidden="true"
            />

            {/* ── RIGHT: Editorial Content & CTAs ── */}
            <div
              ref={rightColRef}
              className="w-full lg:w-[46%] xl:w-[42%] shrink-0 flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[460px] bg-white/85 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,18,38,0.22)]">
                <JourneyContent
                  onWatchProcess={() => setIsVideoModalOpen(true)}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Video Modal: Watch Full Process ── */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Calista EPC Construction Journey Process Video"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAFAFA]">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#005BA4]" />
                <span className="font-mono text-[12px] font-bold tracking-wider text-[#005BA4] uppercase">
                  CALISTA EPC — CONSTRUCTION JOURNEY PROCESS
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                aria-label="Close video modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Area */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                src="/videos/construction-process.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Footer Summary */}
            <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-[18px] text-[#111827] font-medium">
                  Architectural Construction Workflow
                </h4>
                <p className="text-[13px] text-gray-500 font-sans mt-0.5">
                  From architectural vision and structural engineering to precision turnkey craftsmanship.
                </p>
              </div>
              <a
                href="#projects"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-[#005BA4] text-white font-sans text-[13px] font-medium hover:bg-[#00457A] transition-colors whitespace-nowrap"
              >
                Explore Projects
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
