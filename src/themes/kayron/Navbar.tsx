// theme-modules/kayron/Navbar.tsx
import React, { FC } from "react";
import Link from "next/link";
import { NavbarProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles

const KayronNavbar: FC<NavbarProps> = ({
  brandName,
  brandTagline,
  logoSvg,
  navLinks,
  actionButton,
  themeSwitcher,
  mobileMenuButton,
}) => {
  return (
    <nav className="glass fixed w-full top-0 z-50 transition-all duration-300 border-b border-purple-500/20 bg-black/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center animate-float">
              {logoSvg}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-purple">
                {brandName}
              </h1>
              <p className="text-xs text-gray-400">{brandTagline}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium transition-colors relative group text-purple-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            {actionButton}
            {themeSwitcher} {/* The ThemeSwitcher component */}
          </div>
          <button
            className="md:hidden p-2 rounded-lg glass-card"
            aria-label="Abrir menú de navegación"
            aria-expanded="false"
            data-testid="button-mobile-menu"
          >
            {mobileMenuButton}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default KayronNavbar;
