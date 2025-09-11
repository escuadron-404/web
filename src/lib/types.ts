// src/lib/types.ts
import type { FC, ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionaries";

export interface NavLink {
  href: string;
  label: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "subject";
  required?: boolean;
  placeholder?: string;
}

export interface SocialLink {
  icon: ReactNode; // SVG JSX or component
  href: string;
  label: string;
}

export interface NavbarProps {
  brandName: string;
  brandTagline: string;
  logoSvg: ReactNode;
  navLinks: NavLink[];
  themeSwitcher: ReactNode;
  languageSwitcher: ReactNode;
  mobileMenuButton: ReactNode;
  discordLink?: string;
  githubLink?: string;
  actionButton?: ReactNode; // Optional, if you want a call-to-action button in the navbar
}

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaIcon: ReactNode;
}

export interface FeatureCard {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface AboutSectionProps {
  heading: string;
  subheading: string;
  features: FeatureCard[];
}

export interface ProjectCard {
  icon: ReactNode | null; // Can be null now, assigned default in BaseLayout
  title: string;
  description: string;
  tags: string[];
  projectLink: string;
  demoLink: string | null;
}

export interface ProjectsSectionProps {
  heading: string;
  subheading: string;
  projects: ProjectCard[];
  error?: string | null;
}

export interface repo {
  name: string;
  description: string;
  topics: string[];
  html_url: string;
  homepage: string;
}

export interface TestimonialCardProps {
  // Renamed for clarity, represents a single testimonial
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar: ReactNode | null; // Can be null now, assigned default in BaseLayout
  rating: number;
}

export interface TestimonialSectionProps {
  testimonials: TestimonialCardProps[]; // Now expects an array of testimonials
  error?: string | null;
}

export interface ContactFormProps {
  heading: string;
  subheading: string;
  fields: ContactFormField[];
  onSubmit: (formData: Record<string, string>) => void;
  submitButtonText: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface FooterProps {
  brandName: string;
  brandTagline: string;
  logoSvg: ReactNode;
  copyrightText: string;
  socialLinks: SocialLink[];
}

export interface BaseLayoutProps {
  children: React.ReactNode;
  dictionary: Dictionary;
  locale: "en" | "es";
  initialProjects: ProjectCard[];
  initialProjectsError: string | null;
  initialTestimonials: TestimonialCardProps[];
  initialTestimonialsError: string | null;
  navLinks: NavLink[];
  heroContent: HeroProps;
  aboutSectionContent: AboutSectionProps;
  projectsSectionContent: ProjectsSectionProps;
  testimonialSectionContent: TestimonialSectionProps;
  contactFormContent: ContactFormProps;
  footerContent: FooterProps;
}

export type ThemeComponents = {
  Layout: React.ComponentType<{ children: ReactNode }>;
  Navbar: React.ComponentType<NavbarProps>;
  Hero: React.ComponentType<HeroProps>;
  AboutSection: React.ComponentType<AboutSectionProps>;
  ProjectsSection: React.ComponentType<ProjectsSectionProps>;
  TestimonialSection: React.ComponentType<TestimonialSectionProps>;
  ContactForm: React.ComponentType<ContactFormProps>;
  Footer: React.ComponentType<FooterProps>;
};

// Update ThemeContextType here for clarity in useTheme hook
export interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: { id: ThemeName; name: string }[];
  themeComponents: ThemeComponents | null;
  isThemeTransitioning: boolean; // Add this line
}

export type ThemeName = "pix" | "kayron" | string;
