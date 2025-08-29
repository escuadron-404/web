// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "../globals.css";
import { BaseLayout } from "@/components/BaseLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getDictionary } from "@/lib/dictionaries";
import { availableThemes } from "@/lib/themeConfig";
import { getRandomThemeId, loadThemeComponentsServer } from "@/lib/themeServer";
import type {
  ProjectCard,
  repo,
  TestimonialCardProps,
  ThemeName,
  NavLink,
  HeroProps,
  AboutSectionProps,
  ProjectsSectionProps,
  TestimonialSectionProps,
  ContactFormProps,
  FooterProps,
} from "@/lib/types";
import {
  CodeIcon,
  MessageCircleIcon,
  UsersIcon,
  CircleCheckBigIcon,
  BookOpenIcon,
  SendIcon,
  ExternalLinkIcon,
  TwitterIcon,
  GitHubIcon,
  LinkedInIcon,
  DiscordIcon,
} from "@/components/BaseLayout";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dictionary = await getDictionary(locale as "en" | "es");
  return {
    title: `${dictionary.brand.name} - ${dictionary.brand.tagline}`,
    description: dictionary.hero.subtitle,
  };
}

async function fetchGithubProjectsServer(): Promise<{
  projects: ProjectCard[];
  error: string | null;
}> {
  const GITHUB_USER_OR_ORG =
    process.env.GITHUB_USERNAME_OR_ORG || "escuadron-404"; // Provide a default for local dev
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_USER_OR_ORG) {
    console.error(
      "GITHUB_USERNAME_OR_ORG is not set in environment variables.",
    );
    return { projects: [], error: "GitHub user/org not configured." };
  }

  try {
    const headersInit: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };
    if (GITHUB_TOKEN) {
      headersInit.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER_OR_ORG}/repos?sort=updated&per_page=3`,
      {
        headers: headersInit,
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `GitHub API error (SSR): ${response.status} - ${JSON.stringify(errorData)}`,
      );
      return { projects: [], error: "Failed to fetch GitHub projects" };
    }

    const repos = await response.json();

    const projects: ProjectCard[] = repos.map((repo: repo) => ({
      icon: null, // Default icon will be assigned in BaseLayout client component
      title: repo.name,
      description: repo.description || "No description provided.",
      tags: repo.topics && Array.isArray(repo.topics) ? repo.topics : [], // Ensure topics is an array
      projectLink: repo.html_url,
      demoLink: repo.homepage || null,
    }));

    return { projects, error: null };
  } catch (error) {
    console.error("Error fetching GitHub projects (SSR):", error);
    return { projects: [], error: "Internal Server Error fetching projects" };
  }
}

async function fetchTestimonialsServer(): Promise<{
  testimonials: TestimonialCardProps[];
  error: string | null;
}> {
  try {
    const fs = await import("node:fs/promises");
    const filePath = `${process.cwd()}/public/data/testimonials.json`;
    const fileContent = await fs.readFile(filePath, "utf8");
    const testimonials: TestimonialCardProps[] = JSON.parse(fileContent);

    const testimonialsWithAvatars = testimonials.map((t) => ({
      ...t,
      authorAvatar: null, // Default avatar will be assigned in BaseLayout client component
    }));

    return { testimonials: testimonialsWithAvatars, error: null };
  } catch (error) {
    console.error("Error fetching testimonials (SSR):", error);
    return {
      testimonials: [],
      error: "Internal Server Error fetching testimonials",
    };
  }
}

export default async function LocaleRootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>; // params is not a Promise
  }>,
) {
  const params = await props.params;

  const { children } = props;

  const { locale } = params;

  // 1. Load the dictionary based on the current locale
  const dictionary = await getDictionary(locale as "en" | "es");

  // 2. Fetch all necessary data concurrently on the server
  const [
    { projects, error: projectsError },
    { testimonials, error: testimonialsError },
  ] = await Promise.all([
    fetchGithubProjectsServer(),
    fetchTestimonialsServer(),
  ]);

  // 3. Select theme ID: from cookie if valid, otherwise random.
  const themeCookie = (await cookies()).get("app-theme")?.value;
  const isValidTheme = availableThemes.some((t) => t.id === themeCookie);
  const selectedThemeId = (
    isValidTheme ? themeCookie : await getRandomThemeId()
  ) as ThemeName;

  const initialThemeComponents =
    await loadThemeComponentsServer(selectedThemeId);

  // Prepare content for BaseLayout on the server
  const NAV_LINKS: NavLink[] = [
    { label: dictionary.nav.home, href: "#hero" },
    { label: dictionary.nav.about, href: "#about" },
    { label: dictionary.nav.projects, href: "#projects" },
    {
      label: dictionary.nav.testimonials,
      href: "#testimonials",
    },
    { label: dictionary.nav.contact, href: "#contact" },
  ];

  const brandName = dictionary.brand.name;
  const brandTagline = dictionary.brand.tagline;

  const HERO_CONTENT: HeroProps = {
    title: brandName,
    subtitle: dictionary.hero.subtitle,
    ctaText: dictionary.hero.ctaText,
    ctaLink: "https://discord.gg/your-discord-invite",
    ctaIcon: (
      <MessageCircleIcon key="ctaIcon" className="w-6 h-6 inline-block mr-3" />
    ),
  };

  const ABOUT_SECTION_CONTENT: AboutSectionProps = {
    heading: dictionary.about.heading,
    subheading: dictionary.about.subheading,
    features: [
      {
        icon: <CircleCheckBigIcon className="w-10 h-10 text-white" />,
        title: dictionary.about.features.collaborative.title,
        description: dictionary.about.features.collaborative.description,
      },
      {
        icon: <UsersIcon className="w-10 h-10 text-white" />,
        title: dictionary.about.features.mentoring.title,
        description: dictionary.about.features.mentoring.description,
      },
      {
        icon: <BookOpenIcon className="w-10 h-10 text-white" />,
        title: dictionary.about.features.events.title,
        description: dictionary.about.features.events.description,
      },
    ],
  };

  const PROJECTS_SECTION_CONTENT: ProjectsSectionProps = {
    heading: dictionary.projects.heading,
    subheading: dictionary.projects.subheading,
    projects: projects.map((p) => ({
      ...p,
      icon: p.icon || <CodeIcon className="w-6 h-6" />,
    })),
    error: projectsError,
  };

  const TESTIMONIAL_SECTION_CONTENT: TestimonialSectionProps = {
    testimonials: testimonials.map((t) => ({
      ...t,
      authorAvatar: t.authorAvatar || <UsersIcon className="w-8 h-8" />,
    })),
    error: testimonialsError,
  };

  const CONTACT_FORM_CONTENT: ContactFormProps = {
    heading: dictionary.contactForm.heading,
    subheading: dictionary.contactForm.subheading,
    fields: [
      {
        name: "name",
        label: dictionary.contactForm.fields.name.label,
        type: "text",
        required: true,
        placeholder: dictionary.contactForm.fields.name.placeholder,
      },
      {
        name: "email",
        label: dictionary.contactForm.fields.email.label,
        type: "email",
        required: true,
        placeholder: dictionary.contactForm.fields.email.placeholder,
      },
      {
        name: "subject",
        label: dictionary.contactForm.fields.subject.label,
        type: "subject",
        required: false,
        placeholder: dictionary.contactForm.fields.subject.placeholder,
      },
      {
        name: "message",
        label: dictionary.contactForm.fields.message.label,
        type: "textarea",
        required: true,
        placeholder: dictionary.contactForm.fields.message.placeholder,
      },
    ],
    // onSubmit will be handled by the client component
    submitButtonText: dictionary.contactForm.submitButton,
  };

  const FOOTER_CONTENT: FooterProps = {
    brandName: brandName,
    brandTagline: dictionary.brand.footerTagline,
    logoSvg: <CodeIcon className="w-6 h-6 text-white" />,
    copyrightText: dictionary.brand.copyright
      .replace("{year}", new Date().getFullYear().toString())
      .replace("{brandName}", brandName),
    socialLinks: [
      {
        icon: <GitHubIcon className="w-6 h-6" />,
        href:
          process.env.NEXT_PUBLIC_GITHUB_URL ||
          "https://github.com/escuadron-404/",
        label: "GitHub",
      },
      {
        icon: <DiscordIcon className="w-6 h-6" />,
        href:
          process.env.NEXT_PUBLIC_DISCORD_URL ||
          "https://discord.gg/your-discord-invite",
        label: "Discord",
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning data-theme={selectedThemeId}>
      <body className={inter.className}>
        <ThemeProvider
          initialThemeName={selectedThemeId}
          initialThemeComponents={initialThemeComponents}
        >
          <BaseLayout
            locale={locale as "en" | "es"}
            dictionary={dictionary}
            initialProjects={projects}
            initialProjectsError={projectsError}
            initialTestimonials={testimonials}
            initialTestimonialsError={testimonialsError}
            navLinks={NAV_LINKS}
            heroContent={HERO_CONTENT}
            aboutSectionContent={ABOUT_SECTION_CONTENT}
            projectsSectionContent={PROJECTS_SECTION_CONTENT}
            testimonialSectionContent={TESTIMONIAL_SECTION_CONTENT}
            contactFormContent={CONTACT_FORM_CONTENT}
            footerContent={FOOTER_CONTENT}
          >
            {children}
          </BaseLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
