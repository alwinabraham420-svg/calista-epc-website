"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const aboutStats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 6, suffix: "", label: "Districts in Kerala" },
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(aboutStats.map(() => 0));
  const [hasCountStarted, setHasCountStarted] = useState(false);

  // Count-up animation
  const startCounting = useCallback(() => {
    if (hasCountStarted) return;
    setHasCountStarted(true);

    let startTime: number;
    const duration = 2000;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounters(aboutStats.map((s) => Math.floor(easeOutQuart * s.value)));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [hasCountStarted]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setCounters(aboutStats.map((s) => s.value));
      return;
    }

    const ctx = gsap.context(() => {
      // Image parallax + scale
      gsap.fromTo(
        imageRef.current,
        { scale: 1.06 },
        {
          scale: 1,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Text reveal from left
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Side panel slides in
      gsap.fromTo(
        sideRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Stats count trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        onEnter: startCounting,
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [startCounting]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 lg:py-32 bg-[#FAFAFA] border-t border-gray-200/80 overflow-hidden"
      aria-label="About Calista EPC"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Information */}
          <div ref={textRef} className="lg:col-span-4 flex flex-col">
            {/* Top Indicator */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[12px] font-mono font-bold text-[#005BA4] tracking-widest">
                01
              </span>
              <div className="w-8 h-[1px] bg-[#005BA4]" />
              <span className="text-[11.5px] font-mono font-semibold text-gray-500 uppercase tracking-[0.2em]">
                WHO WE ARE
              </span>
            </div>

            {/* Serif Heading */}
            <h2 className="font-serif text-[36px] sm:text-[44px] leading-[1.12] text-[#111827] font-medium mb-6">
              About
              <span className="block text-[#005BA4]">Calista EPC</span>
            </h2>

            {/* Paragraphs */}
            <p className="text-[15px] sm:text-[15.5px] font-sans text-gray-600 font-normal leading-relaxed mb-4">
              Calista EPC Pvt Ltd is a construction company serving clients
              across Kerala, with a strong presence in Alappuzha, Ernakulam,
              Kottayam, Pathanamthitta, Kozhikode and Kollam.
            </p>
            <p className="text-[15px] sm:text-[15.5px] font-sans text-gray-600 font-normal leading-relaxed mb-6">
              We are committed to creating exceptional spaces through quality
              construction, innovative design and a client-focused approach.
            </p>

            {/* Animated Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 py-5 border-t border-gray-200/80 mb-6"
            >
              {aboutStats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-start">
                  <span className="text-[28px] sm:text-[32px] font-serif font-bold text-[#005BA4] leading-none tracking-tight">
                    {counters[i]}
                    {stat.suffix}
                  </span>
                  <span className="text-[11px] font-sans font-medium text-gray-500 mt-1 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Link */}
            <div>
              <a
                href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[14.5px] font-sans font-semibold text-[#005BA4] hover:text-[#00457A] transition-colors duration-200"
              >
                <span className="link-underline">Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Center Column: Large Villa Image with parallax */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.10)]">
              <div ref={imageRef} className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/about/replacement-home.jpg"
                  alt="Luxury Modern Kerala Villa by Calista EPC"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Accent Text */}
          <div
            ref={sideRef}
            className="lg:col-span-2 hidden lg:flex flex-col items-start justify-between h-full pl-6 border-l border-gray-200/80 py-4"
          >
            <div>
              <p className="font-serif text-[18px] text-[#111827] tracking-wider leading-snug uppercase mb-4">
                SPACES
                <br />
                PEOPLE
                <br />
                LOVE
              </p>
              <div className="w-6 h-[1.5px] bg-[#005BA4] mb-6" />
            </div>

            <p className="text-[12px] font-sans text-gray-500 font-normal leading-relaxed max-w-[140px]">
              Building stronger communities across Kerala.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
