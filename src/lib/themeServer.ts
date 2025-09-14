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
  if (
    !Object.prototype.hasOwnProperty.call(themeComponentLoaders, themeId) ||
    typeof loader !== "function"
  ) {
    console.error(
      `Theme components for "${themeId}" not found or invalid. Falling back to default.`,
    );
    // Fallback to a default theme if the requested one is not found or invalid
    const defaultThemeModule =
      await themeComponentLoaders[availableThemes[0].id]();
    return defaultThemeModule.default;
  }
  const module = await loader();
  return module.default;
}
