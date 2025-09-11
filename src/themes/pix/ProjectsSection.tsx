"use client";
// src/themes/pix/ProjectsSection.tsx

import Link from "next/link";
import type { FC } from "react";
import type { ProjectsSectionProps } from "@/lib/types";
import "./style.css";
import { ExternalLinkIcon } from "@/components/BaseLayout";

const PixProjectsSection: FC<ProjectsSectionProps> = ({
  heading,
  subheading,
  projects,
  error,
}) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">
          {heading}
        </h2>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          {subheading}
        </p>
      </div>

      {error && (
        <div className="text-center text-destructive text-lg mb-4">{error}</div>
      )}

      {!error && projects.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.title}
              className="black-card-enhanced rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mr-4">
                  {project.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {project.title}
                </h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={project.projectLink}
                className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors group-hover:translate-x-1 transform duration-300"
              >
                Ver proyecto
                <ExternalLinkIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {!error && projects.length === 0 && (
        <div className="text-center text-muted-foreground text-lg">
          No projects available.
        </div>
      )}
    </div>
  );
};

export default PixProjectsSection;
