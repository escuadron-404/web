import type { ThemeComponents, ThemeName } from "./types";

type ThemeModule = { default: ThemeComponents };

export const availableThemes: { id: ThemeName; name: string }[] = [
  { id: "kayron", name: "Kayron" },
  { id: "pix", name: "Clean Code" },
];

export const themeComponentLoaders: Record<
  ThemeName,
  () => Promise<ThemeModule>
> = {
  kayron: () => import("@/themes/kayron"),
  pix: () => import("@/themes/pix"),
};
