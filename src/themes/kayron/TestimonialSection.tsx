// theme-modules/kayron/TestimonialSection.tsx
import React, { FC } from "react";
import { TestimonialSectionProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles

const KayronTestimonialSection: FC<TestimonialSectionProps> = ({
  testimonial,
}) => {
  const { quote, authorName, authorRole, authorAvatar, rating } = testimonial;
  const starIcons = Array.from({ length: rating }, (_, i) => (
    <div key={i} className="w-4 h-4 bg-yellow-400 rounded"></div>
  ));

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="black-card-enhanced rounded-3xl p-12 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 text-purple-400 mx-auto opacity-50 flex items-center justify-center">
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
              className="lucide lucide-message-circle w-16 h-16"
              aria-hidden="true"
            >
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
            </svg>
          </div>
        </div>
        <blockquote className="text-2xl md:text-3xl font-light text-gray-200 mb-8 leading-relaxed">
          {quote}
        </blockquote>
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center ring-4 ring-purple-500/30">
            {authorAvatar}
          </div>
          <div className="text-left">
            <p className="font-bold text-lg text-gradient-purple">
              {authorName}
            </p>
            <p className="text-gray-400">{authorRole}</p>
            <div className="flex items-center mt-1">
              <div className="flex space-x-1">{starIcons}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KayronTestimonialSection;
