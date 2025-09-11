"use client";
// theme-modules/kayron/Navbar.tsx

import Link from "next/link";
import { type FC, useState } from "react";
import { DiscordIcon, GitHubIcon } from "@/components/BaseLayout";
import type { NavbarProps } from "@/lib/types";
import "./style.css";

const KayronNavbar: FC<NavbarProps> = ({
  brandName,
  brandTagline,
  logoSvg,
  navLinks,
  actionButton,
  themeSwitcher,
  languageSwitcher,
  mobileMenuButton,
  discordLink,
  githubLink,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="glass fixed w-full top-0 z-50 transition-all duration-300 border-b border-purple-500/20 bg-black/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center animate-float">
              {logoSvg}
            </div>
            <div>
              <h1 className="hidden md:block text-xl md:text-2xl font-bold text-gradient-purple">
                {brandName}
              </h1>
              <p className="hidden md:block text-xxs md:text-xs text-gray-400">
                {brandTagline}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            {githubLink && (
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <GitHubIcon className="w-6 h-6" />
              </Link>
            )}
            {discordLink && (
              <Link
                href={discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <DiscordIcon className="w-6 h-6" />
              </Link>
            )}
            {themeSwitcher}
            {languageSwitcher}
            <button
              type="button"
              className="p-2 rounded-lg glass-card"
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
              data-testid="button-mobile-menu"
              onClick={toggleMenu}
            >
              {mobileMenuButton}
            </button>
          </div>
          <div
            className={`md:flex items-center space-x-8 ${isMenuOpen ? "flex flex-col absolute top-full left-0 w-full bg-black/90 py-4 space-x-0 space-y-4" : "hidden"}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium transition-colors relative group text-purple-400"
                onClick={toggleMenu} // Close menu on link click
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            {actionButton}
            <div className="flex items-center space-x-4">
              {!isMenuOpen && githubLink && (
                <Link
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <GitHubIcon className="w-6 h-6" />
                </Link>
              )}
              {!isMenuOpen && discordLink && (
                <Link
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <DiscordIcon className="w-6 h-6" />
                </Link>
              )}
              {!isMenuOpen && themeSwitcher}
              {!isMenuOpen && languageSwitcher}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default KayronNavbar;
