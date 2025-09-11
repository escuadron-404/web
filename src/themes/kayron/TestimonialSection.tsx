"use client";
// theme-modules/kayron/TestimonialSection.tsx
import type { FC } from "react";
import type {
  TestimonialCardProps,
  TestimonialSectionProps,
} from "@/lib/types";
import "./style.css";
import { MessageCircleIcon } from "@/components/BaseLayout";

// Helper component for a single testimonial card
const TestimonialCard: FC<TestimonialCardProps> = ({
  quote,
  authorName,
  authorRole,
  authorAvatar,
  rating,
}) => {
  const starIcons = Array.from({ length: rating }, (_, i) => (
    <div key={i} className="w-4 h-4 bg-yellow-400 rounded"></div>
  ));

  return (
    <div className="black-card-enhanced rounded-3xl p-8 text-center h-full flex flex-col justify-between hover-lift group">
      <div className="mb-6">
        <MessageCircleIcon className="w-12 h-12 text-purple-400 mx-auto opacity-50 mb-4" />
        <blockquote className="text-xl font-light text-gray-200 leading-relaxed italic">
          "{quote}"
        </blockquote>
      </div>
      <div className="flex items-center justify-center space-x-4 pt-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-purple-500/30">
          {authorAvatar}
        </div>
        <div className="text-left">
          <p className="font-bold text-md text-gradient-purple">{authorName}</p>
          <p className="text-gray-400 text-sm">{authorRole}</p>
          <div className="flex items-center mt-1">
            <div className="flex space-x-0.5">{starIcons}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KayronTestimonialSection: FC<TestimonialSectionProps> = ({
  testimonials,
  error,
}) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">
          Testimonios
        </h2>{" "}
        {/* Hardcoded for now, but usually from dictionary */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Lo que nuestra comunidad tiene que decir.
        </p>{" "}
        {/* Hardcoded for now */}
      </div>

      {error && (
        <div className="text-center text-red-500 text-lg mb-4">{error}</div>
      )}

      {!error && testimonials.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      )}

      {!error && testimonials.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No testimonials available.
        </div>
      )}
    </div>
  );
};

export default KayronTestimonialSection;
