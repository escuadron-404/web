"use client";
import React, { type FC } from "react";
import type { AboutSectionProps } from "@/lib/types";
import "./style.css";

const N98AboutSection: FC<AboutSectionProps> = ({
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
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          {subheading}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className=" border border-foreground rounded-xl p-8 text-center hover:shadow-xl hover:shadow-emerald-300/50 hover:-translate-y-1/8 transition-shadow transition-transform duration-300" // Simpler hover effect
          >
            <div className="bg-primary text-primary-foreground w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default N98AboutSection;
