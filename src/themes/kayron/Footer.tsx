// theme-modules/kayron/Footer.tsx
import React, { FC } from "react";
import Link from "next/link";
import { FooterProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles

const KayronFooter: FC<FooterProps> = ({
  brandName,
  brandTagline,
  logoSvg,
  copyrightText,
  socialLinks,
}) => {
  return (
    <footer className="bg-black-purple-gradient border-t border-purple-500/20 py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            {logoSvg}
          </div>
          <span className="text-2xl font-bold text-gradient-purple">
            {brandName}
          </span>
        </div>
        <p className="text-gray-400 mb-8">{brandTagline}</p>
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label={`Síguenos en ${link.label}`}
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <p className="text-gray-500">{copyrightText}</p>
      </div>
    </footer>
  );
};

export default KayronFooter;
