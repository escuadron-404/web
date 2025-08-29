// src/app/layout.tsx
import "./globals.css"; // Global styles apply to the whole app

// REMOVED: Metadata, Inter font. These should go in [locale]/layout.tsx
// The top-level layout in an i18n setup often just passes children.
// Metadata can be dynamic based on locale in the [locale]/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children; // Just pass children directly. The [locale]/layout will provide <html><body>
}
