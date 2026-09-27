"use client";

import React, { useEffect, useState, useRef } from "react";

interface HeroStatsProps {
  className?: string;
}

const targetStats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 6, suffix: "", label: "Districts in Kerala" },
];

export const HeroStats: React.FC<HeroStatsProps> = ({ className = "" }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [stats, setStats] = useState([
    { current: 0, target: 15 },
    { current: 0, target: 100 },
    { current: 0, target: 6 },
  ]);

  useEffect(() => {
    if (hasAnimated) return;

    // Fast reveal for hero stats
    const timer = setTimeout(() => {
      let startTime: number;
      const duration = 1200;

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setStats((prev) =>
          prev.map((stat, i) => ({
            ...stat,
            current: Math.floor(easeOutQuart * targetStats[i].value),
          }))
        );

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setHasAnimated(true);
        }
      };

      requestAnimationFrame(animate);
    }, 400);

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  return (
    <div
      className={`flex flex-row items-center gap-3.5 sm:gap-5 md:gap-6 py-1 select-none z-20 ${className}`}
    >
      {targetStats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <div className="flex flex-col items-start hero-anim-stat">
            <span className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-[#005BA4] font-serif leading-none tracking-tight">
              {stats[index].current}
              {stat.suffix}
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans font-medium text-gray-850 text-gray-800 tracking-tight mt-1 whitespace-nowrap">
              {stat.label}
            </span>
          </div>

          {/* Vertical separator */}
          {index < targetStats.length - 1 && (
            <div
              className="h-7 sm:h-8 w-[1px] bg-gray-400/40 hero-anim-stat mx-0.5 sm:mx-1"
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
