// src/components/BaseLayout.tsx
"use client";

import {
  useCallback,
  useMemo,
  unstable_ViewTransition as ViewTransition,
} from "react";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { BaseLayoutProps } from "@/lib/types";
import { LanguageSwitcher } from "./LanguageSwitcher";

// --- SVG Icons (These remain unchanged) ---
export const CodeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="420"
    height="420"
    viewBox="0 0 420 420"
    fill="none"
    version="1.1"
    id="svg306"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>404</title>
    <rect x="0" y="0" width="100%" height="100%" fill="black" id="rect296" />
    <g transform="translate(0, 106)" id="g304">
      <rect
        x="49.509998"
        y="170"
        width="318.54401"
        height="10"
        fill="#ffffff"
        id="rect300"
        style={{ strokeWidth: 0.870884 }}
      />
      <rect
        x="49.510376"
        y="-7.7982521"
        width="318.54401"
        height="10"
        fill="#ffffff"
        id="rect300-3"
        style={{ strokeWidth: 0.870884 }}
      />
      <text
        x="210"
        y="104"
        fontFamily="'Segoe UI', Arial, sans-serif"
        font-size="192px"
        font-weight="900"
        fill="#FFFFFF"
        text-anchor="middle"
        dominant-baseline="middle"
        user-select="none"
        id="text302"
      >
        404
      </text>
    </g>
  </svg>
);
export const MessageCircleIcon = ({
  className = "",
}: {
  className?: string;
}) => (
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
    className={`lucide lucide-message-circle ${className}`}
    aria-hidden="true"
  >
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
  </svg>
);

export const MenuIcon = ({ className = "" }: { className?: string }) => (
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
    className={`lucide lucide-menu ${className}`}
    aria-hidden="true"
  >
    <path d="M4 12h16"></path>
    <path d="M4 18h16"></path>
    <path d="M4 6h16"></path>
  </svg>
);

export const CircleCheckBigIcon = ({
  className = "",
}: {
  className?: string;
}) => (
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
    className={`lucide lucide-circle-check-big ${className}`}
    aria-hidden="true"
  >
    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
    <path d="m9 11 3 3L22 4"></path>
  </svg>
);

export const UsersIcon = ({ className = "" }: { className?: string }) => (
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
    className={`lucide lucide-users ${className}`}
    aria-hidden="true"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <circle cx="9" cy="7" r="4"></circle>
  </svg>
);

export const BookOpenIcon = ({ className = "" }: { className?: string }) => (
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
    className={`lucide lucide-book-open ${className}`}
    aria-hidden="true"
  >
    <path d="M12 7v14"></path>
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
  </svg>
);

export const SendIcon = ({ className = "" }: { className?: string }) => (
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
    className={`lucide lucide-send ${className}`}
    aria-hidden="true"
  >
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
    <path d="m21.854 2.147-10.94 10.939"></path>
  </svg>
);

export const ExternalLinkIcon = ({
  className = "",
}: {
  className?: string;
}) => (
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
    className={`lucide lucide-external-link ${className}`}
    aria-hidden="true"
  >
    <path d="M15 3h6v6"></path>
    <path d="M10 14 21 3"></path>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  </svg>
);

export const TwitterIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <title>Twitter</title>
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
  </svg>
);

export const GitHubIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <title>GitHub</title>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
  </svg>
);

export const LinkedInIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <title>LinkedIn</title>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
  </svg>
);

export const DiscordIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <title>Discord</title>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
  </svg>
);
// --- End Shared SVG Icons ---

export function BaseLayout({
  children,
  locale,
  dictionary,
  navLinks,
  heroContent,
  aboutSectionContent,
  projectsSectionContent,
  testimonialSectionContent,
  contactFormContent,
  footerContent,
}: BaseLayoutProps) {
  // --- ALL HOOK CALLS MUST BE AT THE TOP LEVEL ---

  const { currentTheme, themeComponents } = useTheme();

  const handleContactSubmit = useCallback(
    async (formData: Record<string, string>) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log(result);
          alert(result.message || "Message sent successfully!");
        } else {
          alert(result.error || "Failed to send message.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    },
    [],
  );

  const {
    Layout,
    Navbar,
    Hero,
    AboutSection,
    ProjectsSection,
    TestimonialSection,
    ContactForm,
    Footer,
  } = themeComponents;

  return (
    <Layout>
      <Navbar
        brandName={dictionary.brand.name}
        brandTagline={dictionary.brand.tagline}
        logoSvg={<CodeIcon className="w-6 h-6 text-white" />}
        navLinks={navLinks}
        themeSwitcher={<ThemeSwitcher />}
        languageSwitcher={<LanguageSwitcher currentLocale={locale} />}
        mobileMenuButton={<MenuIcon className="w-6 h-6" />}
        discordLink={process.env.NEXT_PUBLIC_DISCORD_URL}
        githubLink={process.env.NEXT_PUBLIC_GITHUB_URL}
      />
      <main
        className="flex-grow"
        style={{ viewTransitionName: "main-content" }}
      >
        {/* Re-introducing ViewTransition: */}
        {/* Key it by `currentTheme` so React knows to transition when the theme changes. */}
        {/* The content inside will be captured for the transition. */}
        <ViewTransition key={currentTheme}>
          <section id="hero">
            <Hero {...heroContent} />
          </section>
          <section id="about">
            <AboutSection {...aboutSectionContent} />
          </section>
          <section id="projects">
            <ProjectsSection {...projectsSectionContent} />
          </section>
          <section id="testimonials">
            <TestimonialSection {...testimonialSectionContent} />
          </section>
          <section id="contact">
            <ContactForm
              {...contactFormContent}
              onSubmit={handleContactSubmit}
            />
          </section>
          {children}
        </ViewTransition>
      </main>
      <Footer {...footerContent} />
    </Layout>
  );
}
