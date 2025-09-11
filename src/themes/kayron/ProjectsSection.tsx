"use client";
// theme-modules/kayron/ProjectsSection.tsx

import Link from "next/link";
import type { FC } from "react";
import type { ProjectsSectionProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles
import { ExternalLinkIcon } from "@/components/BaseLayout"; // Import icon

const KayronProjectsSection: FC<ProjectsSectionProps> = ({
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
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subheading}</p>
      </div>

      {error && (
        <div className="text-center text-red-500 text-lg mb-4">{error}</div>
      )}

      {!error && projects.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.title}
              className="black-card-enhanced rounded-3xl p-8 hover-lift group"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  {project.icon}
                </div>
                <h3 className="text-2xl font-bold text-gradient-purple">
                  {project.title}
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={project.projectLink}
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold transition-colors group-hover:translate-x-2 transform duration-300"
              >
                Ver proyecto
                <ExternalLinkIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {!error && projects.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No projects available.
        </div>
      )}
    </div>
  );
};

export default KayronProjectsSection;
