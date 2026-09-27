"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const locations = [
  "Alappuzha",
  "Ernakulam",
  "Kottayam",
  "Pathanamthitta",
  "Kozhikode",
  "Kollam",
];

export const AcrossKeralaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Image parallax + scale
      gsap.fromTo(
        imageRef.current,
        { scale: 1.06 },
        {
          scale: 1,
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Map reveal with scale
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Location badges stagger
      if (locationsRef.current) {
        const badges = locationsRef.current.children;
        gsap.fromTo(
          badges,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: locationsRef.current,
              start: "top 85%",
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
      id="across-kerala"
      className="relative w-full py-24 lg:py-32 bg-[#FFFFFF] border-t border-gray-100/90 overflow-hidden"
      aria-label="Across Kerala"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Kerala Backwaters */}
          <div className="lg:col-span-4 relative">
            <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
              <div ref={imageRef} className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/kerala/backwaters.jpg"
                  alt="Kerala Backwaters and Traditional Houseboats - Calista EPC Service Region"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Center Column: Text & CTA */}
          <div ref={textRef} className="lg:col-span-4 flex flex-col justify-center">
            <span className="text-[11.5px] sm:text-[12px] font-mono tracking-[0.25em] text-[#005BA4] font-semibold uppercase mb-3 block">
              ACROSS KERALA
            </span>

            <h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.15] text-[#111827] font-medium mb-5">
              Building Kerala&apos;s Tomorrow
            </h2>

            <p className="text-[14.5px] sm:text-[15px] font-sans text-gray-600 font-normal leading-relaxed mb-6">
              From Alappuzha to Kozhikode, we build exceptional spaces across
              Kerala, creating stronger communities and brighter futures.
            </p>

            {/* Location badges */}
            <div
              ref={locationsRef}
              className="flex flex-wrap gap-2 mb-8"
            >
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#005BA4]/5 border border-[#005BA4]/10 text-[11px] font-sans font-semibold text-[#005BA4] tracking-wide"
                >
                  {loc}
                </span>
              ))}
            </div>

            <div>
              <a
                href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#005BA4] text-white text-[13.5px] font-sans font-semibold hover:bg-[#00457A] transition-all duration-300 shadow-sm hover:shadow-md group"
                data-cursor="cta"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Kerala Map */}
          <div
            ref={mapRef}
            className="lg:col-span-4 relative w-full aspect-[1024/840] max-w-[460px] mx-auto flex items-center justify-center"
          >
            <Image
              src="/images/kerala/kerala-map.png"
              alt="Calista EPC Locations Across Kerala - Alappuzha, Ernakulam, Kottayam, Pathanamthitta, Kozhikode, Kollam"
              fill
              unoptimized
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
