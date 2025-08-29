import type { ThemeComponents } from "@/lib/types";
import KayronAboutSection from "./AboutSection";
import KayronContactForm from "./ContactForm";
import KayronFooter from "./Footer";
import KayronHero from "./Hero";
import KayronLayout from "./Layout";
import KayronNavbar from "./Navbar";
import KayronProjectsSection from "./ProjectsSection";
import KayronTestimonialSection from "./TestimonialSection";

const KayronTheme: ThemeComponents = {
  Layout: KayronLayout,
  Navbar: KayronNavbar,
  Hero: KayronHero,
  AboutSection: KayronAboutSection,
  ProjectsSection: KayronProjectsSection,
  TestimonialSection: KayronTestimonialSection,
  ContactForm: KayronContactForm,
  Footer: KayronFooter,
};

export default KayronTheme;
