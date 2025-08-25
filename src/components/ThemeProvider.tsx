"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { ThemeName, ThemeComponents } from "@/lib/types";
import { availableThemes, themeComponentLoaders } from "@/lib/themeConfig";

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: { id: ThemeName; name: string }[];
  themeComponents: ThemeComponents | null;
  isLoadingTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(
    availableThemes[0].id,
  );
  const [themeComponents, setThemeComponents] =
    useState<ThemeComponents | null>(null);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  // Function to load a theme's components
  const loadThemeComponents = useCallback(async (themeId: ThemeName) => {
    setIsLoadingTheme(true);
    try {
      const loader = themeComponentLoaders[themeId];
      if (loader) {
        const module = await loader();
        setThemeComponents(module.default);
      } else {
        console.warn(
          `Theme components for "${themeId}" not found. Falling back to default.`,
        );
        const defaultModule =
          await themeComponentLoaders[availableThemes[0].id]();
        setThemeComponents(defaultModule.default);
      }
    } catch (error) {
      console.error(`Failed to load theme components for "${themeId}":`, error);
      // Fallback to default if there's an error loading a specific theme
      const defaultModule =
        await themeComponentLoaders[availableThemes[0].id]();
      setThemeComponents(defaultModule.default);
    } finally {
      setIsLoadingTheme(false);
    }
  }, []);

  // Effect to load theme from localStorage and then load components
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") as ThemeName;
    const initialTheme =
      savedTheme && availableThemes.some((t) => t.id === savedTheme)
        ? savedTheme
        : "default";
    setCurrentTheme(initialTheme);
    loadThemeComponents(initialTheme); // Load components immediately
  }, [loadThemeComponents]);

  // Effect to apply data-theme attribute and save to localStorage whenever currentTheme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("app-theme", currentTheme);
    loadThemeComponents(currentTheme); // Reload components when theme changes
  }, [currentTheme, loadThemeComponents]);

  const setTheme = (theme: ThemeName) => {
    if (availableThemes.some((t) => t.id === theme)) {
      setCurrentTheme(theme);
    } else {
      console.warn(
        `Attempted to set unknown theme: ${theme}. Sticking to current.`,
      );
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        availableThemes,
        themeComponents,
        isLoadingTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
