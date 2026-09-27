"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface Section {
  id: string;
  label: string;
  number: string;
}

const SECTIONS: Section[] = [
  { id: "hero", label: "VISION", number: "01" },
  { id: "construction-journey", label: "JOURNEY", number: "02" },
  { id: "about", label: "ABOUT", number: "03" },
  { id: "services", label: "SERVICES", number: "04" },
  { id: "why-us", label: "WHY US", number: "05" },
  { id: "projects", label: "PROJECTS", number: "06" },
  { id: "process", label: "PROCESS", number: "07" },
  { id: "across-kerala", label: "LOCATIONS", number: "08" },
  { id: "reviews", label: "REVIEWS", number: "09" },
  { id: "instagram", label: "SOCIAL", number: "10" },
  { id: "cta", label: "CONTACT", number: "11" },
];

export const ScrollProgress: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);

    // Show after scrolling past hero
    setIsVisible(scrollTop > 200);

    // Determine active section
    const sectionElements = SECTIONS.map((s) =>
      document.getElementById(s.id)
    ).filter(Boolean);

    let currentIndex = 0;
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const el = sectionElements[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          currentIndex = i;
          break;
        }
      }
    }
    setActiveIndex(currentIndex);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isJourneyActive = SECTIONS[activeIndex]?.id === "construction-journey";

  return (
    <>
      {/* Desktop: Fixed left-side vertical navigation */}
      <div
        ref={containerRef}
        className={`fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-0 transition-all duration-500 ${
          isVisible && !isJourneyActive
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
        role="navigation"
        aria-label="Section progress navigation"
      >
        {SECTIONS.map((section, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;

          return (
            <React.Fragment key={section.id}>
              {/* Section node */}
              <button
                onClick={() => scrollToSection(section.id)}
                className={`group relative flex items-center cursor-pointer transition-all duration-300 py-1`}
                aria-label={`Navigate to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Dot */}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-[#005BA4] shadow-[0_0_8px_rgba(0,91,164,0.4)]"
                      : isPast
                      ? "w-1.5 h-1.5 bg-[#005BA4]/60"
                      : "w-1.5 h-1.5 bg-gray-300"
                  }`}
                />

                {/* Label (visible on active) */}
                <div
                  className={`absolute left-6 whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 pointer-events-none"
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#005BA4] uppercase">
                    {section.number}
                  </span>
                  <span className="text-[9px] font-mono font-semibold tracking-[0.15em] text-gray-500 uppercase ml-1.5">
                    {section.label}
                  </span>
                </div>
              </button>

              {/* Connecting line between dots */}
              {index < SECTIONS.length - 1 && (
                <div className="relative w-[1px] h-4 bg-gray-200/60">
                  <div
                    className="absolute top-0 left-0 w-full bg-[#005BA4]/50 transition-all duration-500"
                    style={{
                      height: isPast ? "100%" : isActive ? "50%" : "0%",
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile: Thin top progress bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-[2px] bg-gray-100 w-full">
          <div
            className="h-full bg-gradient-to-r from-[#005BA4] via-[#00AEEF] to-[#8DC63F] transition-[width] duration-200"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};
