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

export const FinalCTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        y: 50,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Heading lines reveal upward
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".cta-line");
        gsap.fromTo(
          lines,
          { y: 40, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // CTA buttons reveal
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative w-full py-28 lg:py-36 overflow-hidden bg-[#0A0E17]"
      aria-label="Call to Action"
    >
      {/* Anchor for #contact */}
      <div id="contact" className="absolute -top-16 left-0" aria-hidden="true" />

      {/* Background with parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/images/cta/cta-villa.jpg"
          alt="Modern Architectural Villa Night Illumination"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E17] via-[#0A0E17]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/60 via-transparent to-[#0A0E17]/40" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            {/* Heading with line-by-line reveal */}
            <h2
              ref={headingRef}
              className="font-serif text-[36px] sm:text-[48px] lg:text-[56px] text-white font-medium leading-[1.1] mb-4"
            >
              <span className="cta-line block">Let&apos;s Build</span>
              <span className="cta-line block">a Better</span>
              <span className="cta-line block text-[#00AEEF]">
                Tomorrow.
              </span>
            </h2>
            <div ref={contentRef}>
              <p className="text-[15px] sm:text-[16px] font-sans text-gray-300 font-normal max-w-[500px]">
                Ready to bring your vision to life? Get in touch with us
                today.
              </p>
            </div>
          </div>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#005BA4] text-white text-[14px] font-sans font-semibold hover:bg-[#00457A] transition-all duration-300 shadow-lg hover:shadow-xl group"
              data-cursor="cta"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            <a
              href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center px-8 py-4 rounded-full border border-white/25 text-white text-[14px] font-sans font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 glass"
              data-cursor="cta"
            >
              <span>Talk to Our Team</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
