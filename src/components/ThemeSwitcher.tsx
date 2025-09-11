"use client";

import { useTheme } from "@/components/ThemeProvider";
import React, { useState, useEffect, useRef } from "react";

const PaletteIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <title>Theme</title>
    <circle cx="12" cy="12" r="7" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M20 12h2" />
    <path d="M2 12h2" />
    <path d="m18.36 5.64-1.41 1.41" />
    <path d="m6.05 17.95-1.41 1.41" />
    <path d="m17.95 17.95-1.41-1.41" />
    <path d="m5.64 6.05 1.41-1.41" />
  </svg>
);

export function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center rounded-md text-text-base hover:bg-background-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        id="theme-menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <PaletteIcon className="w-6 h-6" />
        <span className="sr-only">Change Theme</span>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-background-card ring-1 ring-border ring-opacity-50 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="theme-menu-button"
        >
          <div className="py-1" role="none">
            {availableThemes.map((theme) => (
              <button
                type="button"
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentTheme === theme.id
                    ? "bg-primary text-primary-foreground"
                    : "text-text-base hover:bg-muted"
                }`}
                role="menuitem"
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

