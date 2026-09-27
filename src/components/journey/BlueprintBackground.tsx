"use client";

import React from "react";

export const BlueprintBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #005BA4 1px, transparent 1px),
            linear-gradient(to bottom, #005BA4 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Architectural CAD Blueprint Wireframe Lines */}
      <svg
        className="absolute inset-0 w-full h-full text-slate-300/40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="cad-grid"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 120 0 L 0 0 0 120"
              fill="none"
              stroke="rgba(0, 91, 164, 0.04)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#cad-grid)" />

        {/* Isometric Wireframe Villa Sketches (Left Center) */}
        <g
          transform="translate(180, 140) scale(0.9)"
          stroke="rgba(0, 91, 164, 0.12)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
        >
          {/* Ground Footprint Wireframe */}
          <polygon points="120,420 380,310 520,380 260,490" />
          <polygon points="120,360 380,250 520,320 260,430" />
          <line x1="120" y1="420" x2="120" y2="360" />
          <line x1="380" y1="310" x2="380" y2="250" />
          <line x1="520" y1="380" x2="520" y2="320" />
          <line x1="260" y1="490" x2="260" y2="430" />

          {/* First Floor Wireframe Outline */}
          <polygon points="100,280 340,180 480,240 240,340" />
          <line x1="100" y1="280" x2="100" y2="200" />
          <line x1="340" y1="180" x2="340" y2="100" />
          <line x1="480" y1="240" x2="480" y2="160" />

          {/* Roof Cantilever Wireframe Outline */}
          <polygon points="80,160 320,60 460,120 220,220" />
          <line
            x1="80"
            y1="160"
            x2="80"
            y2="420"
            stroke="rgba(0, 91, 164, 0.08)"
            strokeDasharray="2 4"
          />
          <line
            x1="460"
            y1="120"
            x2="460"
            y2="380"
            stroke="rgba(0, 91, 164, 0.08)"
            strokeDasharray="2 4"
          />

          {/* Dimension guidelines */}
          <line
            x1="50"
            y1="160"
            x2="50"
            y2="420"
            stroke="rgba(0, 91, 164, 0.18)"
            strokeWidth="0.8"
          />
          <line
            x1="45"
            y1="160"
            x2="55"
            y2="160"
            stroke="rgba(0, 91, 164, 0.25)"
          />
          <line
            x1="45"
            y1="420"
            x2="55"
            y2="420"
            stroke="rgba(0, 91, 164, 0.25)"
          />
        </g>
      </svg>
    </div>
  );
};
