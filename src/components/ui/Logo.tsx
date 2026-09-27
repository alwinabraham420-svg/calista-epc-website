import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className = "", onClick }) => {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center group transition-opacity hover:opacity-90 select-none ${className}`}
      aria-label="Calista EPC Home"
    >
      <div className="relative flex items-center transition-transform duration-300 group-hover:scale-[1.01]">
        <Image
          src="/images/home/calista-logo.png"
          alt="Calista EPC — Building Spaces. Creating Tomorrow."
          width={1024}
          height={341}
          priority
          unoptimized
          className="h-9 sm:h-10 lg:h-11 w-auto object-contain object-left"
        />
      </div>
    </Link>
  );
};
