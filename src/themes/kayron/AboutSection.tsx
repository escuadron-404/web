"use client";
// theme-modules/kayron/AboutSection.tsx
import React, { type FC } from "react";
import type { AboutSectionProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles

const KayronAboutSection: FC<AboutSectionProps> = ({
  heading,
  subheading,
  features,
}) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">
          {heading}
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subheading}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="black-card-enhanced rounded-3xl p-8 text-center hover-lift group"
            style={{ animationDelay: `${index * 0.2}s` }} // Preserve original animation delays
          >
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-soft group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-purple">
              {feature.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KayronAboutSection;
