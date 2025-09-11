"use client";
// src/themes/pix/TestimonialSection.tsx
import React, { type FC } from "react";
import type {
  TestimonialCardProps,
  TestimonialSectionProps,
} from "@/lib/types";
import "./style.css";
import { MessageCircleIcon } from "@/components/BaseLayout"; // Ensure icon is imported

// Helper component for a single testimonial card
const TestimonialCard: FC<TestimonialCardProps> = ({
  quote,
  authorName,
  authorRole,
  authorAvatar,
  rating,
}) => {
  const starIcons = Array.from({ length: rating }, (_, i) => (
    <div
      key={`${i}-${authorName}`}
      className="w-4 h-4 bg-yellow-400 rounded"
    ></div>
  ));

  return (
    <div className="black-card-enhanced rounded-xl p-8 text-center h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div className="mb-6">
        <MessageCircleIcon className="w-12 h-12 text-primary mx-auto opacity-50 mb-4" />
        <blockquote className="text-xl font-light text-foreground leading-relaxed italic">
          "{quote}"
        </blockquote>
      </div>
      <div className="flex items-center justify-center space-x-4 pt-4">
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center ring-2 ring-primary/30">
          {authorAvatar}
        </div>
        <div className="text-left">
          <p className="font-bold text-md text-foreground">{authorName}</p>
          <p className="text-muted-foreground text-sm">{authorRole}</p>
          <div className="flex items-center mt-1">
            <div className="flex space-x-0.5">{starIcons}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PixTestimonialSection: FC<TestimonialSectionProps> = ({
  testimonials,
  error,
}) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">
          Testimonios
        </h2>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          Lo que nuestra comunidad tiene que decir.
        </p>
      </div>

      {error && (
        <div className="text-center text-destructive text-lg mb-4">{error}</div>
      )}

      {!error && testimonials.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`testimonial-${index}`} {...testimonial} />
          ))}
        </div>
      )}

      {!error && testimonials.length === 0 && (
        <div className="text-center text-muted-foreground text-lg">
          No testimonials available.
        </div>
      )}
    </div>
  );
};

export default PixTestimonialSection;
