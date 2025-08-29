// src/components/ThemeProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useTransition,
} from "react";
import type { ThemeName, ThemeComponents } from "@/lib/types";
import { availableThemes, themeComponentLoaders } from "@/lib/themeConfig";

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: { id: ThemeName; name: string }[];
  themeComponents: ThemeComponents; // <--- No longer can be null
  isThemeTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define props for the provider
interface ThemeProviderProps {
  children: ReactNode;
  initialThemeComponents: ThemeComponents;
  initialThemeName: ThemeName;
}

export function ThemeProvider({
  children,
  initialThemeComponents,
  initialThemeName,
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(initialThemeName);
  const [themeComponents, setThemeComponents] = useState<ThemeComponents>(
    initialThemeComponents,
  );
  const [isPendingThemeLoad, startTransitionThemeLoad] = useTransition();

  const loadAndSetTheme = useCallback(
    (themeId: ThemeName) => {
      startTransitionThemeLoad(async () => {
        try {
          const loader = themeComponentLoaders[themeId];
          if (loader) {
            const module = await loader();
            setThemeComponents(module.default);
          } else {
            console.warn(
              `Theme components for "${themeId}" not found. Falling back to default.`,
            );
            const fallbackModule =
              await themeComponentLoaders[availableThemes[0].id]();
            setThemeComponents(fallbackModule.default);
          }
        } catch (error) {
          console.error(
            `Failed to load theme components for "${themeId}":`,
            error,
          );
          const fallbackModule =
            await themeComponentLoaders[availableThemes[0].id]();
          setThemeComponents(fallbackModule.default);
        }
      });
    },
    [], // initialThemeComponents is not needed here
  );

  // Effect to update document, localStorage, and cookie when currentTheme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("app-theme", currentTheme);
    document.cookie = `app-theme=${currentTheme};path=/;max-age=31536000;SameSite=Lax`;
  }, [currentTheme]);

  // This function is called by the ThemeSwitcher
  const setTheme = (theme: ThemeName) => {
    if (availableThemes.some((t) => t.id === theme)) {
      setCurrentTheme(theme);
      if (theme !== currentTheme) {
        loadAndSetTheme(theme);
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        availableThemes,
        themeComponents,
        isThemeTransitioning: isPendingThemeLoad,
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
