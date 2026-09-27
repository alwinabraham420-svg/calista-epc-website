"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Award, CheckCircle2, Users, HardHat } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    number: "01",
    title: "Uncompromising Quality",
    description:
      "We maintain the highest standards in every project we undertake.",
    icon: Award,
  },
  {
    number: "02",
    title: "Proven Expertise",
    description: "Years of experience and a skilled team you can trust.",
    icon: CheckCircle2,
  },
  {
    number: "03",
    title: "Client Collaboration",
    description: "Your vision is at the heart of everything we build.",
    icon: Users,
  },
  {
    number: "04",
    title: "Workplace Safety",
    description: "A safe workplace for a stronger, brighter tomorrow.",
    icon: HardHat,
  },
];

export const WhyUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleScroll = useCallback(() => {
    if (!itemsRef.current) return;
    const children = Array.from(itemsRef.current.children);
    children.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
        setActiveIndex((prev) => Math.max(prev, index));
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setActiveIndex(3);
      return;
    }

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

      // Items stagger
      const items = itemsRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemsRef.current,
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
      id="why-us"
      className="relative w-full py-24 lg:py-32 bg-[#FFFFFF] border-t border-gray-100/90 overflow-hidden"
      aria-label="Why Calista EPC"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading */}
          <div ref={headingRef} className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[12px] font-mono font-bold text-[#005BA4] tracking-widest">
                01
              </span>
              <div className="w-8 h-[1px] bg-[#005BA4]" />
              <span className="text-[11.5px] font-mono font-semibold text-gray-500 uppercase tracking-[0.2em]">
                WHY CALISTA EPC
              </span>
            </div>

            <h2 className="font-serif text-[38px] sm:text-[46px] leading-[1.1] text-[#111827] font-medium">
              Why
              <span className="block text-[#005BA4]">Calista EPC</span>
            </h2>
          </div>

          {/* Right Column: Pillars with active state */}
          <div
            ref={itemsRef}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isActive = index <= activeIndex;

              return (
                <div
                  key={pillar.number}
                  className={`flex flex-col items-start border-l-2 pl-5 sm:pl-6 pt-1 transition-all duration-500 ${
                    isActive
                      ? "border-[#005BA4] opacity-100"
                      : "border-gray-100 opacity-50"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-500 ${
                      isActive
                        ? "bg-[#005BA4]/10 border border-[#005BA4]/20 text-[#005BA4]"
                        : "bg-gray-50 border border-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[1.6]" />
                  </div>

                  {/* Number */}
                  <span
                    className={`text-[13px] font-mono font-bold mb-2 transition-colors duration-500 ${
                      isActive ? "text-[#005BA4]" : "text-gray-300"
                    }`}
                  >
                    {pillar.number}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-[16px] font-sans font-semibold leading-snug mb-2 transition-colors duration-500 ${
                      isActive ? "text-[#111827]" : "text-gray-400"
                    }`}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] font-sans text-gray-500 font-normal leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
