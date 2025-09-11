import type { ThemeComponents } from "@/lib/types";
import PixAboutSection from "./AboutSection";
import PixContactForm from "./ContactForm";
import PixFooter from "./Footer";
import PixHero from "./Hero";
import PixLayout from "./Layout";
import PixNavbar from "./Navbar";
import PixProjectsSection from "./ProjectsSection";
import PixTestimonialSection from "./TestimonialSection";

const PixTheme: ThemeComponents = {
  Layout: PixLayout,
  Navbar: PixNavbar,
  Hero: PixHero,
  AboutSection: PixAboutSection,
  ProjectsSection: PixProjectsSection,
  TestimonialSection: PixTestimonialSection,
  ContactForm: PixContactForm,
  Footer: PixFooter,
};

export default PixTheme;
