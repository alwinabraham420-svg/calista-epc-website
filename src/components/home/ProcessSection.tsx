"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description: "Understanding your needs",
  },
  {
    number: "02",
    title: "Planning",
    description: "Strategic planning for success",
  },
  {
    number: "03",
    title: "Design",
    description: "Bringing ideas to life",
  },
  {
    number: "04",
    title: "Construction",
    description: "Expert execution",
  },
  {
    number: "05",
    title: "Quality",
    description: "Rigorous quality checks",
  },
  {
    number: "06",
    title: "Handover",
    description: "Delivering spaces you'll love",
  },
];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Timeline line draws itself via scroll
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Steps stagger — triggered after line starts
      const steps = stepsRef.current?.children;
      if (steps) {
        gsap.fromTo(
          steps,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
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
      id="process"
      className="relative w-full py-24 lg:py-32 bg-[#FFFFFF] border-t border-gray-100/90 overflow-hidden"
      aria-label="Our Process"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <span className="text-[11.5px] sm:text-[12px] font-mono tracking-[0.25em] text-[#005BA4] font-semibold uppercase mb-3 block">
            OUR PROCESS
          </span>
          <h2 className="font-serif text-[32px] sm:text-[42px] leading-[1.15] text-[#111827] font-medium max-w-[620px]">
            From concept to completion
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Connecting Line — scroll-drawn */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[11px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#005BA4] via-[#00AEEF] to-[#8DC63F] rounded-full"
            style={{
              boxShadow: "0 0 8px rgba(0, 174, 239, 0.2)",
            }}
          />

          {/* Steps Grid */}
          <div
            ref={stepsRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10"
          >
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-start relative pr-2 group"
              >
                {/* Node marker with pulse */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full border-2 border-[#005BA4] bg-white flex items-center justify-center shadow-sm group-hover:animate-node-pulse transition-shadow">
                    <div className="w-2 h-2 rounded-full bg-[#005BA4]" />
                  </div>
                  <span className="text-[14px] font-mono font-bold text-[#005BA4]">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-sans font-semibold text-[#111827] leading-tight mb-1.5">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[12.5px] font-sans text-gray-500 font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
