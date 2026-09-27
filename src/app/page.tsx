"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { ConstructionJourney } from "@/components/journey/ConstructionJourney";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { AcrossKeralaSection } from "@/components/home/AcrossKeralaSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": "https://calistaepc.com/#organization",
        "name": "Calista EPC Pvt Ltd",
        "url": "https://calistaepc.com",
        "logo": "https://calistaepc.com/images/home/calista-logo-blue.png",
        "description": "Leading construction company in Kerala specializing in residential villas, commercial complexes, industrial facilities, and infrastructure.",
        "telephone": "+919539093771",
        "email": "info@calistabuilders.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Alappuzha",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        },
        "areaServed": [
          "Alappuzha",
          "Ernakulam",
          "Kottayam",
          "Pathanamthitta",
          "Kozhikode",
          "Kollam"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "160"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://calistaepc.com/#website",
        "url": "https://calistaepc.com",
        "name": "Calista EPC",
        "publisher": {
          "@id": "https://calistaepc.com/#organization"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative min-h-screen bg-white selection:bg-[#005BA4] selection:text-white">
        {/* Header & Navigation */}
        <Header />

        {/* BLOCK 01: HERO (Preserved intact) */}
        <Hero />

        {/* BLOCK 02: THE CONSTRUCTION JOURNEY (Temporarily hidden) */}
        {/* <ConstructionJourney /> */}

        {/* BLOCK 03: ABOUT CALISTA EPC */}
        <AboutSection />

        {/* BLOCK 04: OUR SERVICES (Dark Section) */}
        <ServicesSection />

        {/* BLOCK 05: WHY CALISTA EPC */}
        <WhyUsSection />

        {/* BLOCK 06: FEATURED PROJECTS */}
        <ProjectsSection />

        {/* BLOCK 07: OUR PROCESS */}
        <ProcessSection />

        {/* BLOCK 08: ACROSS KERALA */}
        <AcrossKeralaSection />

        {/* BLOCK 09 & 10: CLIENT & GOOGLE REVIEWS */}
        <ReviewsSection />

        {/* BLOCK 11: INSTAGRAM */}
        <InstagramSection />

        {/* BLOCK 12: FINAL CTA (Dark Section) */}
        <FinalCTASection />

        {/* BLOCK 13: FOOTER */}
        <Footer />
      </main>
    </>
  );
}
