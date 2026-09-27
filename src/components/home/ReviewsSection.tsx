"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Quote,
} from "lucide-react";
import {
  GOOGLE_REVIEWS_SUMMARY,
  GOOGLE_BUSINESS_REVIEWS,
  GOOGLE_MAPS_REVIEW_URL,
  GoogleBusinessReview,
} from "@/data/reviews";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const clientCardRef = useRef<HTMLDivElement>(null);
  const googleCardRef = useRef<HTMLDivElement>(null);

  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  const currentFeatured: GoogleBusinessReview =
    GOOGLE_BUSINESS_REVIEWS[featuredIndex];

  const smallReviews: GoogleBusinessReview[] =
    GOOGLE_BUSINESS_REVIEWS.slice(1);
  const [smallIndex, setSmallIndex] = useState<number>(0);
  const maxSmallIndex = Math.max(0, smallReviews.length - 3);

  // Auto-advance featured review every 8 seconds
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    autoAdvanceRef.current = setInterval(() => {
      if (!isPaused) {
        setFeaturedIndex(
          (prev) => (prev + 1) % GOOGLE_BUSINESS_REVIEWS.length
        );
      }
    }, 8000);
  }, [isPaused]);

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [startAutoAdvance]);

  const handlePrevFeatured = () => {
    setFeaturedIndex(
      (prev) =>
        (prev - 1 + GOOGLE_BUSINESS_REVIEWS.length) %
        GOOGLE_BUSINESS_REVIEWS.length
    );
  };

  const handleNextFeatured = () => {
    setFeaturedIndex(
      (prev) => (prev + 1) % GOOGLE_BUSINESS_REVIEWS.length
    );
  };

  const handlePrevSmall = () => {
    setSmallIndex((prev) => (prev > 0 ? prev - 1 : maxSmallIndex));
  };

  const handleNextSmall = () => {
    setSmallIndex((prev) => (prev < maxSmallIndex ? prev + 1 : 0));
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        clientCardRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        googleCardRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full py-24 lg:py-32 bg-[#FAFAFA] border-t border-gray-100/90 overflow-hidden"
      aria-label="Client & Google Reviews"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Side: Featured Review Card */}
          <div
            ref={clientCardRef}
            className="lg:col-span-5 flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <span className="text-[11.5px] sm:text-[12px] font-mono tracking-[0.25em] text-[#005BA4] font-semibold uppercase mb-3 block">
              CLIENT REVIEWS
            </span>

            <h2 className="font-serif text-[32px] sm:text-[40px] leading-[1.15] text-[#111827] font-medium mb-8">
              What Our Clients Say
            </h2>

            {/* Glass Featured Testimonial Card */}
            <div className="relative p-7 rounded-xl glass-card flex flex-col justify-between min-h-[340px] shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-[#005BA4]/15" />
                  <div className="flex items-center text-amber-400 gap-0.5 animate-shimmer">
                    {[...Array(currentFeatured.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-[15px] sm:text-[16px] font-sans text-gray-700 italic leading-relaxed mb-6">
                  &ldquo;{currentFeatured.text}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  {currentFeatured.profilePhoto ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-200 shrink-0">
                      <Image
                        src={currentFeatured.profilePhoto}
                        alt={currentFeatured.reviewerName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#005BA4]/15 to-[#00AEEF]/15 text-[#005BA4] flex items-center justify-center font-sans font-bold text-[14px] border border-[#005BA4]/10 shrink-0">
                      {getInitials(currentFeatured.reviewerName)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-[14px] font-sans font-bold text-[#111827]">
                      {currentFeatured.reviewerName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] font-sans text-gray-500">
                      {currentFeatured.location && (
                        <>
                          <span>{currentFeatured.location}</span>
                          <span>·</span>
                        </>
                      )}
                      <span>{currentFeatured.relativeTime}</span>
                    </div>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevFeatured}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#005BA4] hover:border-[#005BA4] transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextFeatured}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#005BA4] hover:border-[#005BA4] transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Google Reviews */}
          <div ref={googleCardRef} className="lg:col-span-7 flex flex-col">
            {/* Google Rating Header */}
            <div className="p-6 rounded-xl glass-card shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1 text-[20px] font-sans font-bold tracking-tight">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                  <span className="text-gray-700 font-medium ml-1">
                    Reviews
                  </span>
                </div>

                <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <span className="text-[20px] font-sans font-bold text-gray-900">
                    {GOOGLE_REVIEWS_SUMMARY.rating}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[12.5px] font-sans text-gray-500 font-medium">
                    160+ Reviews
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevSmall}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#005BA4] hover:border-[#005BA4] transition-colors"
                    aria-label="Previous Google reviews"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSmall}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#005BA4] hover:border-[#005BA4] transition-colors"
                    aria-label="Next Google reviews"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={GOOGLE_MAPS_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-[12.5px] font-sans font-medium text-gray-700 hover:text-[#005BA4] hover:border-[#005BA4] transition-all duration-300"
                >
                  <span>Write a Review</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Desktop: Glass review cards */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-4">
              {smallReviews.slice(smallIndex, smallIndex + 3).map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-xl glass-card flex flex-col justify-between shadow-sm min-h-[220px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-[12.5px] font-sans text-gray-600 leading-relaxed mb-4">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-100/60 flex flex-col gap-0.5 text-[11.5px] font-sans">
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="font-semibold text-gray-700">
                        {rev.reviewerName}
                      </span>
                      <span>{rev.relativeTime}</span>
                    </div>
                    {rev.reviewMeta && (
                      <span className="text-[10.5px] text-gray-400">
                        {rev.reviewMeta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: Stack all cards */}
            <div className="sm:hidden flex flex-col gap-4">
              {smallReviews.map((rev) => (
                <div
                  key={`mobile-${rev.id}`}
                  className="p-5 rounded-xl glass-card flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-[13px] font-sans text-gray-600 leading-relaxed mb-4">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-100/60 flex flex-col gap-0.5 text-[11.5px] font-sans">
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="font-semibold text-gray-700">
                        {rev.reviewerName}
                      </span>
                      <span>{rev.relativeTime}</span>
                    </div>
                    {rev.reviewMeta && (
                      <span className="text-[10.5px] text-gray-400">
                        {rev.reviewMeta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
