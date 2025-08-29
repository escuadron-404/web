"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

interface LanguageSwitcherProps {
  currentLocale: string;
}

const GlobeIcon = ({ className = "" }) => (
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
    <title>Locale</title>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2" />
    <path d="M2 12h20" />
  </svg>
);

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locales = [
    { code: "en", name: "EN" },
    { code: "es", name: "ES" },
  ];

  const handleLocaleChange = (newLocale: string) => {
    const newPathname = `/${newLocale}${pathname.substring(3)}`;
    router.push(newPathname);
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
        id="language-menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <GlobeIcon className="w-6 h-6" />
        <span className="sr-only">Change Language</span>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-20 rounded-md shadow-lg bg-background-card ring-1 ring-border ring-opacity-50 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
        >
          <div className="py-1" role="none">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => handleLocaleChange(locale.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLocale === locale.code
                    ? "bg-primary text-primary-foreground"
                    : "text-text-base hover:bg-muted"
                }`}
                role="menuitem"
              >
                {locale.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

