import type { ThemeComponents } from "@/lib/types";
import KayronLayout from "./Layout";
import KayronNavbar from "./Navbar";
import KayronHero from "./Hero";
import KayronAboutSection from "./AboutSection";
import KayronProjectsSection from "./ProjectsSection";
import KayronTestimonialSection from "./TestimonialSection";
import KayronCallToActionSection from "./CallToActionSection";
import KayronContactForm from "./ContactForm";
import KayronFooter from "./Footer";

const KayronTheme: ThemeComponents = {
  Layout: KayronLayout,
  Navbar: KayronNavbar,
  Hero: KayronHero,
  AboutSection: KayronAboutSection,
  ProjectsSection: KayronProjectsSection,
  TestimonialSection: KayronTestimonialSection,
  CallToActionSection: KayronCallToActionSection,
  ContactForm: KayronContactForm,
  Footer: KayronFooter,
};

export default KayronTheme;
