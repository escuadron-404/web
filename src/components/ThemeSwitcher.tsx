"use client"; // This component is interactive

import { useTheme } from "@/components/ThemeProvider"; // Adjust path as needed
import { useState } from "react";

export function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false); // For a more advanced dropdown if needed

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as typeof currentTheme);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <label htmlFor="theme-select" className="sr-only">
        Choose Theme
      </label>
      <select
        id="theme-select"
        value={currentTheme}
        onChange={handleChange}
        className="
          py-2 pl-3 pr-8
          bg-background-card
          text-text-base
          border border-border
          rounded-md
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          cursor-pointer
          appearance-none
          transition-all duration-200 ease-in-out
        "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%23${("var(--color-text-base)").slice(4, 10)}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.5rem center",
          backgroundSize: "1.5em 1.5em",
        }}
      >
        {availableThemes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}
