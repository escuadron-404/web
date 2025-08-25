// theme-modules/kayron/Hero.tsx
import React, { FC } from "react";
import Link from "next/link";
import { HeroProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles

const KayronHero: FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  ctaIcon,
}) => {
  return (
    <div className="bg-mesh min-h-screen pt-24">
      {" "}
      {/* Note: id="comunidad" is on the BaseLayout's section wrapper */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gradient bg-gradient-to-r from-white via-purple-200 to-blue-200 animate-gradient-x leading-tight">
              {title}
            </h1>
          </div>
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <Link
              href={ctaLink}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 hover:scale-105 animate-glow shadow-2xl"
              data-testid="button-discord-hero"
            >
              {ctaIcon}
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KayronHero;
