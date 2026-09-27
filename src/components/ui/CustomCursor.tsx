"use client";

import React, { useEffect, useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<
    "default" | "hover" | "project" | "cta"
  >("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Only disable custom cursor on touch-only devices (e.g. mobile phones without mouse)
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchOnly) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Safely enable custom cursor styling on root html
    document.documentElement.classList.add("has-custom-cursor");

    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        if (prefersReducedMotion) {
          // Instant track without spring lag when reduced motion is preferred
          dotPos.current.x = mousePos.current.x;
          dotPos.current.y = mousePos.current.y;
          ringPos.current.x = mousePos.current.x;
          ringPos.current.y = mousePos.current.y;
        } else {
          // Smooth interpolation
          dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.9;
          dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.9;

          ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
          ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;
        }

        dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isInitializedRef.current) {
        dotPos.current = { x: e.clientX, y: e.clientY };
        ringPos.current = { x: e.clientX, y: e.clientY };
        isInitializedRef.current = true;
      }

      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest("a, button, [data-cursor]") as HTMLElement | null;
      if (!el) return;

      const cursorType = el.getAttribute("data-cursor");

      if (cursorType === "project") {
        setCursorState("project");
        setCursorLabel("VIEW →");
      } else if (
        cursorType === "cta" ||
        el.tagName === "BUTTON" ||
        el.closest("[data-cursor='cta']")
      ) {
        setCursorState("cta");
        setCursorLabel("");
      } else {
        setCursorState("hover");
        setCursorLabel("");
      }
    };

    const handleElementLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const currentEl = target.closest("a, button, [data-cursor]") as HTMLElement | null;
      if (!currentEl) return;

      const nextTarget = e.relatedTarget as HTMLElement | null;
      // If moving to another element within the same interactive container, maintain state
      if (nextTarget && currentEl.contains(nextTarget)) {
        return;
      }

      // Check if moving directly into another interactive element
      if (nextTarget) {
        const nextInteractive = nextTarget.closest("a, button, [data-cursor]") as HTMLElement | null;
        if (nextInteractive) return;
      }

      setCursorState("default");
      setCursorLabel("");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseout", handleElementLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseout", handleElementLeave);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  const dotSize =
    cursorState === "default"
      ? "w-2 h-2"
      : cursorState === "project"
      ? "w-0 h-0"
      : "w-1.5 h-1.5";

  const ringSize =
    cursorState === "project"
      ? "w-20 h-20"
      : cursorState === "cta"
      ? "w-12 h-12"
      : cursorState === "hover"
      ? "w-10 h-10"
      : "w-9 h-9";

  const ringBorder =
    cursorState === "project"
      ? "border border-white/40 bg-black/40 backdrop-blur-sm"
      : cursorState === "cta"
      ? "border border-[#005BA4]/40 bg-[#005BA4]/10"
      : cursorState === "hover"
      ? "border border-gray-500/50"
      : "border border-gray-400/40";

  return (
    <div
      className="custom-cursor-container fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    >
      {/* Inner dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-[#111827] transition-[width,height] duration-200 ease-out pointer-events-none ${dotSize}`}
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,border,background] duration-300 ease-out pointer-events-none ${ringSize} ${ringBorder} flex items-center justify-center`}
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      >
        {cursorLabel && (
          <span className="text-[10px] font-sans font-bold tracking-wider text-white whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
};
