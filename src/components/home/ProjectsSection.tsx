"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
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

      // Cards stagger with varied delays for masonry feel
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [p1, p2, p3, p4] = FEATURED_PROJECTS;

  const ProjectCard = ({
    project,
    className,
    titleSize = "text-[20px]",
    locSize = "text-[13px]",
    btnSize = "w-10 h-10",
  }: {
    project: (typeof FEATURED_PROJECTS)[0];
    className: string;
    titleSize?: string;
    locSize?: string;
    btnSize?: string;
  }) => (
    <a
      href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card group relative w-full rounded-lg overflow-hidden shadow-sm flex flex-col justify-end p-6 ${className}`}
      data-cursor="project"
    >
      <Image
        src={project.coverImage}
        alt={project.name}
        fill
        unoptimized
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/70" />

      {/* Glass info panel on hover */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="transition-transform duration-500 group-hover:-translate-y-1">
          {/* Category badge */}
          <span className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/60 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.category}
          </span>
          <h3
            className={`${titleSize} font-sans font-bold text-white leading-tight mb-1`}
          >
            {project.name}
          </h3>
          <span className={`${locSize} font-sans text-gray-300`}>
            {project.location}
          </span>
        </div>
        <div
          className={`${btnSize} rounded-full glass-dark flex items-center justify-center text-white group-hover:bg-[#005BA4] group-hover:border-[#005BA4] transition-all duration-300 shrink-0`}
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        </div>
      </div>
    </a>
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 lg:py-32 bg-[#FAFAFA] border-t border-gray-100/90 overflow-hidden"
      aria-label="Featured Projects"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6"
        >
          <div>
            <span className="text-[11.5px] sm:text-[12px] font-mono tracking-[0.25em] text-[#005BA4] font-semibold uppercase mb-3 block">
              FEATURED PROJECTS
            </span>
            <h2 className="font-serif text-[32px] sm:text-[42px] leading-[1.15] text-[#111827] font-medium max-w-[620px]">
              Spaces that inspire. Built to last.
            </h2>
          </div>

          <div>
            <a
              href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[14px] font-sans font-semibold text-[#005BA4] hover:text-[#00457A] transition-colors duration-200"
            >
              <span className="link-underline">View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Left: Large Featured */}
          <div className="lg:col-span-4 flex">
            <ProjectCard
              project={p1}
              className="h-[380px] lg:h-[480px]"
            />
          </div>

          {/* Center: Two Stacked */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ProjectCard
              project={p2}
              className="h-[227px]"
              titleSize="text-[17px]"
              locSize="text-[12px]"
              btnSize="w-8 h-8"
            />
            <ProjectCard
              project={p3}
              className="h-[227px]"
              titleSize="text-[17px]"
              locSize="text-[12px]"
              btnSize="w-8 h-8"
            />
          </div>

          {/* Right: Large Featured */}
          <div className="lg:col-span-4 flex">
            <ProjectCard
              project={p4}
              className="h-[380px] lg:h-[480px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
