import type { ThemeComponents } from "@/lib/types";
import N98AboutSection from "./AboutSection";
import N98ContactForm from "./ContactForm";
import N98Footer from "./Footer";
import N98Hero from "./Hero";
import N98Layout from "./Layout";
import N98Navbar from "./Navbar";
import N98ProjectsSection from "./ProjectsSection";
import N98TestimonialSection from "./TestimonialSection";

const PixTheme: ThemeComponents = {
  Layout: N98Layout,
  Navbar: N98Navbar,
  Hero: N98Hero,
  AboutSection: N98AboutSection,
  ProjectsSection: N98ProjectsSection,
  TestimonialSection: N98TestimonialSection,
  ContactForm: N98ContactForm,
  Footer: N98Footer,
};

export default PixTheme;
