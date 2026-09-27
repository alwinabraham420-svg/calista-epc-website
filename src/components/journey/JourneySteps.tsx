"use client";

import React from "react";

export interface JourneyStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "vision",
    number: "01",
    title: "Vision",
    subtitle: "A solid beginning",
  },
  {
    id: "concept",
    number: "02",
    title: "Concept",
    subtitle: "Architectural vision",
  },
  {
    id: "structure",
    number: "03",
    title: "Structure",
    subtitle: "Strength within",
  },
  {
    id: "walls",
    number: "04",
    title: "Walls & Interior",
    subtitle: "Spaces take shape",
  },
  {
    id: "finishing",
    number: "05",
    title: "Finishing",
    subtitle: "Details that matter",
  },
];

interface JourneyStepsProps {
  activeIndex: number;
  onSelectStep: (index: number) => void;
}

export const JourneySteps: React.FC<JourneyStepsProps> = ({
  activeIndex,
  onSelectStep,
}) => {
  return (
    <div className="w-full">
      {/* ── Desktop Vertical Timeline (>= 1024px) ── */}
      <div
        className="hidden lg:flex relative flex-col justify-between select-none py-2 w-full max-w-[260px] xl:max-w-[280px]"
        role="tablist"
        aria-label="Construction Journey Stages"
      >
        {/* Vertical line track */}
        <div className="absolute left-[7px] top-4 bottom-4 w-[1px] bg-gray-200/90 pointer-events-none" />

        {/* Dynamic progress fill line */}
        <div
          className="absolute left-[7px] top-4 w-[1.5px] bg-[#005BA4] transition-all duration-500 ease-out pointer-events-none"
          style={{
            height: `${(activeIndex / (JOURNEY_STEPS.length - 1)) * 100}%`,
            maxHeight: "calc(100% - 2rem)",
          }}
        />

        <div className="flex flex-col gap-6 sm:gap-7 xl:gap-8">
          {JOURNEY_STEPS.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectStep(index)}
                className={`group relative flex items-center text-left pl-6 pr-4 py-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005BA4] rounded-lg cursor-pointer ${
                  isActive ? "opacity-100" : "opacity-35 hover:opacity-75"
                }`}
              >
                {/* Dot on the vertical line */}
                <div
                  className={`absolute left-[3px] top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-[#005BA4] ring-4 ring-[#005BA4]/20 shadow-[0_0_8px_rgba(0,91,164,0.5)] -left-[1px]"
                      : "w-2 h-2 bg-gray-300 group-hover:bg-gray-400"
                  }`}
                />

                {/* Step Number in Serif */}
                <span
                  className={`font-serif text-[17px] sm:text-[19px] lg:text-[20px] font-medium mr-3.5 sm:mr-4 transition-colors duration-200 ${
                    isActive ? "text-[#005BA4] font-semibold" : "text-gray-400"
                  }`}
                >
                  {step.number}
                </span>

                {/* Title & Subtitle */}
                <div className="flex flex-col min-w-0 pr-2">
                  <span
                    className={`font-sans text-[13.5px] sm:text-[14.5px] leading-snug transition-colors duration-200 truncate ${
                      isActive
                        ? "text-[#111827] font-semibold"
                        : "text-gray-500 font-medium"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span
                    className={`font-sans text-[11px] sm:text-[11.5px] transition-colors duration-200 truncate ${
                      isActive ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {step.subtitle}
                  </span>
                </div>

                {/* Active horizontal leader notch pointing towards the house */}
                {isActive && (
                  <div
                    className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 w-6 lg:w-8 h-[2px] bg-[#005BA4] rounded-full transition-all duration-300"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Mobile Horizontal Stepper (< 1024px) ── */}
      <div className="lg:hidden w-full max-w-sm mx-auto my-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          {JOURNEY_STEPS.map((step, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(idx)}
                className="flex flex-col items-center gap-1 focus:outline-none"
                aria-label={`Go to stage ${step.number}`}
              >
                <span
                  className={`text-[12px] font-serif font-bold transition-colors ${
                    isActive ? "text-[#005BA4]" : "text-gray-400"
                  }`}
                >
                  {step.number}
                </span>
                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    isActive
                      ? "bg-[#005BA4] scale-125 shadow-[0_0_6px_rgba(0,91,164,0.6)]"
                      : "bg-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-center">
          <span className="text-[11px] font-mono tracking-wider font-semibold text-[#005BA4] uppercase">
            {JOURNEY_STEPS[activeIndex]?.number} — {JOURNEY_STEPS[activeIndex]?.title}
          </span>
        </div>
      </div>
    </div>
  );
};
