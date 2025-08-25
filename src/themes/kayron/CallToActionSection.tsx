import React, { FC } from "react";
import Link from "next/link";
import { CallToActionProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles

const KayronCallToActionSection: FC<CallToActionProps> = ({
  heading,
  subheading,
  ctaText,
  ctaLink,
  ctaIcon,
}) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="glass-card rounded-3xl p-12 text-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">
          {heading}
        </h2>
        <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>
        <Link
          href={ctaLink}
          className="bg-gradient-to-r from-white to-gray-100 text-purple-900 font-bold py-4 px-10 rounded-2xl text-lg hover:from-gray-100 hover:to-white transition-all duration-300 hover:scale-105 shadow-2xl"
          data-testid="button-discord-cta"
        >
          {ctaIcon}
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default KayronCallToActionSection;
