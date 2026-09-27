"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger reveal with scale
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="services"
      className="relative w-full py-24 lg:py-32 bg-[#0C1017] text-white overflow-hidden"
      aria-label="Our Services"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div
          ref={headingRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="text-[11.5px] sm:text-[12px] font-mono tracking-[0.25em] text-[#00AEEF] font-semibold uppercase mb-3 block">
              OUR SERVICES
            </span>
            <h2 className="font-serif text-[32px] sm:text-[42px] lg:text-[46px] leading-[1.15] text-white font-medium max-w-[680px]">
              Comprehensive construction solutions for a better tomorrow.
            </h2>
          </div>

          <div>
            <a
              href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-gray-700 text-[13.5px] font-sans font-medium text-gray-200 hover:text-white hover:border-[#00AEEF] hover:bg-white/5 transition-all duration-300"
            >
              <span>Enquire About Services</span>
              <ArrowUpRight className="w-4 h-4 text-[#00AEEF]" />
            </a>
          </div>
        </div>

        {/* Cinematic Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES_DATA.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative h-[360px] sm:h-[420px] rounded-lg overflow-hidden border border-white/10 flex flex-col justify-between p-6 transition-all duration-500 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              data-cursor="project"
            >
              {/* Photographic Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  style={{ transform: "scale(1)", transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                {/* Gradient Overlay — deepens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1017] via-[#0C1017]/55 to-black/35 transition-all duration-500 group-hover:via-[#0C1017]/45 group-hover:to-black/25" />
              </div>

              {/* Card Top: Number */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[18px] font-mono font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
                  {service.number}
                </span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-300 group-hover:border-[#00AEEF] group-hover:text-[#00AEEF] group-hover:bg-white/5 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Card Bottom: Title & Description */}
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-[19px] sm:text-[20px] font-sans font-semibold text-white leading-snug mb-2 group-hover:text-[#00AEEF] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[12.5px] font-sans text-gray-300 font-normal leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-gray-200">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[12.5px] font-sans font-medium text-gray-400 group-hover:text-white transition-all duration-300">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#00AEEF] transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
