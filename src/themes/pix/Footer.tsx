"use client";
import Link from "next/link";
import type { FC } from "react";
import type { FooterProps } from "@/lib/types";
import "./style.css";

const PixFooter: FC<FooterProps> = ({
  brandName,
  brandTagline,
  logoSvg,
  copyrightText,
  socialLinks,
}) => {
  return (
    <footer className="bg-secondary border-t border-border py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
            {logoSvg}
          </div>
          <span className="text-2xl font-bold text-foreground">
            {brandName}
          </span>
        </div>
        <p className="text-muted-foreground mb-8">{brandTagline}</p>
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`Síguenos en ${link.label}`}
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">{copyrightText}</p>
      </div>
    </footer>
  );
};

export default PixFooter;
