"use client";
import Link from "next/link";
import { DiscordIcon, GitHubIcon } from "@/components/BaseLayout";
import { type FC, useState } from "react";
import type { NavbarProps } from "@/lib/types";
import "./style.css";

const PixNavbar: FC<NavbarProps> = ({
  brandName,
  brandTagline,
  logoSvg,
  navLinks,
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
    <nav className="glass fixed w-full top-0 z-50 transition-all duration-300 border-b border-border bg-card/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center">
              {logoSvg}
            </div>
            <div>
              <h1 className="hidden md:block text-xl md:text-2xl font-bold text-foreground">
                {brandName}
              </h1>
              <p className="hidden md:block text-xxs md:text-xs text-muted-foreground">
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
                className="text-foreground hover:text-primary transition-colors"
              >
                <GitHubIcon className="w-6 h-6" />
              </Link>
            )}
            {discordLink && (
              <Link
                href={discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <DiscordIcon className="w-6 h-6" />
              </Link>
            )}
            {themeSwitcher}
            {languageSwitcher}
            <button
              type="button"
              className="p-2 rounded-lg bg-secondary text-secondary-foreground"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              data-testid="button-mobile-menu"
              onClick={toggleMenu}
            >
              {mobileMenuButton}
            </button>
          </div>
          <div
            className={`md:flex items-center space-x-8 ${isMenuOpen ? "flex flex-col absolute top-full left-0 w-full bg-card/90 py-4 space-x-0 space-y-4" : "hidden"}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-foreground hover:text-primary transition-colors relative group"
                onClick={toggleMenu} // Close menu on link click
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              {githubLink && !isMenuOpen && (
                <Link
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <GitHubIcon className="w-6 h-6" />
                </Link>
              )}
              {discordLink && !isMenuOpen && (
                <Link
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
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

export default PixNavbar;
