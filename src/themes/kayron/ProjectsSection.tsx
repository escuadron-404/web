// theme-modules/kayron/ProjectsSection.tsx
import React, { FC } from "react";
import Link from "next/link";
import { ProjectsSectionProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles

const KayronProjectsSection: FC<ProjectsSectionProps> = ({
  heading,
  subheading,
  projects,
}) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">
          {heading}
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subheading}</p>
      </div>
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
                // Hardcoding tag colors for demonstration, in a real app these might be dynamic
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
                className="lucide lucide-external-link w-4 h-4 ml-2"
                aria-hidden="true"
              >
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KayronProjectsSection;
