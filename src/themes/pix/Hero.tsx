"use client";
import Link from "next/link";
import type { FC } from "react";
import type { HeroProps } from "@/lib/types";
import "./style.css"; // Import Pix's specific styles

const PixHero: FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  ctaIcon,
}) => {
  return (
    <div className="bg-mesh min-h-screen pt-24 flex items-center justify-center">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gradient-purple leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-foreground leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </p>
          <Link
            href={ctaLink}
            className="bg-primary text-primary-foreground font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            data-testid="button-discord-hero"
          >
            {ctaIcon}
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PixHero;
