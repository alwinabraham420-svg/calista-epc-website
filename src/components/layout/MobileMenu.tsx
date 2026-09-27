"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Phone, ArrowRight, MessageSquare } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Home", href: "/", active: true },
  { name: "About", href: "#about", active: false },
  { name: "Services", href: "#services", active: false },
  { name: "Projects", href: "#projects", active: false },
  { name: "Reviews", href: "#reviews", active: false },
  { name: "Contact", href: "#contact", active: false },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Mobile Navigation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <Logo onClick={onClose} />
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="mt-8 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`text-lg font-medium transition-colors py-2 flex items-center justify-between ${
                  link.active
                    ? "text-[#005BA4] font-semibold"
                    : "text-gray-700 hover:text-[#005BA4]"
                }`}
              >
                <span>{link.name}</span>
                {link.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005BA4]" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer contact actions */}
        <div className="pt-6 border-t border-gray-100 space-y-3">
          <a
            href="tel:+919539093771"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg bg-gray-50 text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#005BA4]" />
            <span>+91 9539093771</span>
          </a>

          <a
            href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg bg-[#25D366]/10 text-[#128C7E] text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="https://wa.me/919539093771?text=I%20visited%20your%20website%20-%20want%20to%20know%20more%20details"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-[#005BA4] text-white text-sm font-medium hover:bg-[#004780] shadow-sm transition-colors group"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
