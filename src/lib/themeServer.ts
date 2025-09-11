"use server";
import { availableThemes, themeComponentLoaders } from "./themeConfig";
import type { ThemeComponents, ThemeName } from "./types";

// Server-side function to randomly select a theme
export async function getRandomThemeId(): Promise<ThemeName> {
  const randomIndex = Math.floor(Math.random() * availableThemes.length);
  return availableThemes[randomIndex].id;
}

// Server-side function to load theme components
export async function loadThemeComponentsServer(
  themeId: ThemeName,
): Promise<ThemeComponents> {
  const loader = themeComponentLoaders[themeId];
  if (!loader) {
    console.error(
      `Theme components for "${themeId}" not found. Falling back to default.`,
    );
    // Fallback to a default theme if the requested one is not found
    const defaultThemeModule =
      await themeComponentLoaders[availableThemes[0].id]();
    return defaultThemeModule.default;
  }
  const module = await loader();
  return module.default;
}
