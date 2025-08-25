import { Inter } from "next/font/google"; // Import Inter
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { BaseLayout } from "@/components/BaseLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" }); // Define it as a CSS variable

export const metadata: Metadata = {
  title: "Contractor Collective - Hire Our Team",
  description:
    "A collective of expert programmers ready to tackle your projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <body>
        <ThemeProvider>
          <BaseLayout>{children}</BaseLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
