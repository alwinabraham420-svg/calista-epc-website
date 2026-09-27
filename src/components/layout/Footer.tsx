"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BUSINESS_INFO } from "@/data/contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#FFFFFF] border-t border-gray-100 text-gray-600 font-sans select-none"
    >
      {/* Main Footer Grid */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo className="mb-5 block" />
            <p className="text-[13.5px] text-gray-500 font-normal leading-relaxed max-w-[320px] mb-6">
              A trusted construction company in Kerala, creating exceptional
              spaces for a brighter tomorrow.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-mono font-bold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Projects", href: "#projects" },
                { label: "Reviews", href: "#reviews" },
                {
                  label: "Contact",
                  href: BUSINESS_INFO.whatsAppUrl,
                  isExternal: true,
                },
              ].map((item) => (
                <li key={item.label}>
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline hover:text-[#005BA4] transition-colors duration-300 inline-block"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="link-underline hover:text-[#005BA4] transition-colors duration-300 inline-block"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-mono font-bold text-gray-900 tracking-wider uppercase mb-4">
              Our Locations
            </h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {[
                "Alappuzha",
                "Ernakulam",
                "Kottayam",
                "Pathanamthitta",
                "Kozhikode",
                "Kollam",
              ].map((loc) => (
                <li key={loc} className="text-gray-600">
                  {loc}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-mono font-bold text-gray-900 tracking-wider uppercase mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-[13.5px]">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#005BA4] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919539093771"
                    className="link-underline hover:text-[#005BA4] transition-colors duration-300 font-medium inline-block"
                  >
                    +91 9539093771
                  </a>
                  <a
                    href="tel:+919947093771"
                    className="link-underline hover:text-[#005BA4] transition-colors duration-300 font-medium inline-block"
                  >
                    +91 9947093771
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#005BA4] shrink-0" />
                <a
                  href="mailto:info@calistabuilders.com"
                  className="link-underline hover:text-[#005BA4] transition-colors duration-300 inline-block"
                >
                  info@calistabuilders.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#005BA4] shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  Alappuzha, Kerala, India
                </span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  label: "Facebook",
                  href: "https://facebook.com/calistaepc",
                  path: "M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.403 0 22.675 0z",
                },
                {
                  label: "Twitter / X",
                  href: "https://twitter.com/calistaepc",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "Pinterest",
                  href: "https://pinterest.com/calistaepc",
                  path: "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z",
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/calista_epc/",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#005BA4] hover:border-[#005BA4] hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-10 mt-12 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[12.5px] text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Calista EPC. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span
              className="text-gray-400 cursor-default"
              title="Coming soon"
            >
              Privacy Policy
            </span>
            <span>|</span>
            <span
              className="text-gray-400 cursor-default"
              title="Coming soon"
            >
              Terms &amp; Conditions
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[#005BA4] font-semibold text-[11px] tracking-wider uppercase">
              Building a Better Tomorrow
            </span>
            <div className="w-4 h-[2px] bg-gradient-to-r from-[#005BA4] to-[#8DC63F]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
