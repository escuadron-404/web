import type { FC, ReactNode } from "react";

// Define the structure of navigation links
export interface NavLink {
  href: string;
  label: string;
}

// Define the structure of contact form fields
export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "subject"; // Added 'subject' type
  required?: boolean;
  placeholder?: string;
}

// Define the structure of social links (for footer)
export interface SocialLink {
  icon: ReactNode; // SVG JSX or component
  href: string;
  label: string;
}

// --- Component Props Interfaces (for required content) ---
export interface NavbarProps {
  brandName: string;
  brandTagline: string;
  logoSvg: ReactNode;
  navLinks: NavLink[];
  themeSwitcher: ReactNode; // The ThemeSwitcher component itself
  mobileMenuButton: ReactNode; // E.g., a "Hamburger" icon button
}

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaIcon: ReactNode; // Icon for the CTA button
}

// For Kayron's "What do we do?" section
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

// For Kayron's "Proyectos Destacados" section
export interface ProjectCard {
  icon: ReactNode;
  title: string;
  description: string;
  tags: string[];
  projectLink: string;
}

export interface ProjectsSectionProps {
  heading: string;
  subheading: string;
  projects: ProjectCard[];
}

// For Kayron's Testimonial section
export interface TestimonialProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar: ReactNode; // Could be a simple icon or an actual image component
  rating: number; // e.g., 1-5 stars
}

export interface TestimonialSectionProps {
  testimonial: TestimonialProps;
}

// For Kayron's final "Listo para unirte?" CTA section
export interface CallToActionProps {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
  ctaIcon: ReactNode;
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

// --- The Core Theme Components Interface ---
export interface ThemeComponents {
  Layout: FC<{ children: ReactNode }>;
  Navbar: FC<NavbarProps>;
  Hero: FC<HeroProps>;
  AboutSection: FC<AboutSectionProps>;
  ProjectsSection: FC<ProjectsSectionProps>; // New section
  TestimonialSection: FC<TestimonialSectionProps>; // New section
  CallToActionSection: FC<CallToActionProps>; // New section
  ContactForm: FC<ContactFormProps>;
  Footer: FC<FooterProps>;
}

export type ThemeName = "pix" | "kayron" | string; // Add 'kayron'
