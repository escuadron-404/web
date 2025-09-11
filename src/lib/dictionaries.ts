// src/lib/dictionaries.ts
import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

const dictionaries: Record<string, () => Promise<any>> = {
  en: () =>
    fs
      .readFile(path.join(process.cwd(), "public", "data", "en.json"), "utf8")
      .then((fileContents) => JSON.parse(fileContents)),
  es: () =>
    fs
      .readFile(path.join(process.cwd(), "public", "data", "es.json"), "utf8")
      .then((fileContents) => JSON.parse(fileContents)),
};

export const getDictionary = async (locale: "en" | "es") => {
  if (!dictionaries[locale]) {
    // Fallback to default if locale not found
    return dictionaries.es();
  }
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
