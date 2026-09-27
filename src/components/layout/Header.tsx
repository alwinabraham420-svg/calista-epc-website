"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "About", href: "#about", active: false },
    { label: "Services", href: "#services", active: false },
    { label: "Projects", href: "#projects", active: false },
    { label: "Reviews", href: "#reviews", active: false },
    { label: "Contact", href: "#contact", active: false },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-3 ${
          isScrolled
            ? "bg-white/75 backdrop-blur-[16px] border-b border-gray-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-transparent border-b border-transparent"
        } ${className}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-[14px] font-medium tracking-normal transition-colors duration-300 link-underline ${
                  item.active
                    ? "text-[#111827] font-semibold"
                    : isScrolled
                    ? "text-gray-600 hover:text-[#005BA4]"
                    : "text-gray-700 hover:text-[#005BA4]"
                }`}
              >
                {item.label}
                {item.active && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-[2px] rounded-full bg-gradient-to-r from-[#005BA4] via-[#008282] to-[#25D366]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: Phone & CTA */}
          <div className="hidden sm:flex items-center space-x-3.5 md:space-x-4">
            {/* Phone Icon + Number */}
            <a
              href="tel:+919539093771"
              className={`inline-flex items-center gap-2 text-[13px] font-medium tracking-tight transition-all duration-300 ${
                isScrolled
                  ? "text-gray-800 hover:text-[#005BA4]"
                  : "text-gray-700 hover:text-[#005BA4]"
              }`}
              aria-label="Call Calista EPC at +91 9539093771"
            >
              <span className="w-5 h-5 flex items-center justify-center text-[#005BA4]">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span>+91 9539093771</span>
            </a>

            {/* CTA button — Premium rounded-lg */}
            <a
              href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#005BA4] hover:bg-[#004780] text-white text-[13px] sm:text-[14px] font-medium tracking-normal shadow-sm hover:shadow-md transition-all duration-300 group"
              data-cursor="cta"
            >
              Start Your Project{" "}
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Menu Toggle & Phone */}
          <div className="flex items-center space-x-1 sm:hidden shrink-0 z-50">
            <a
              href="tel:+919539093771"
              className="p-2 text-[#005BA4] bg-white/80 hover:bg-blue-50 rounded-full border border-gray-200/80 shadow-xs transition-colors"
              aria-label="Call Calista EPC at +91 9539093771"
            >
              <Phone className="w-3.5 h-3.5 text-[#005BA4]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-800 bg-white/80 hover:bg-gray-100 rounded-md border border-gray-200/80 shadow-xs transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4 text-gray-900" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
