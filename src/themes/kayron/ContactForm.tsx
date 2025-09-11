"use client";
// theme-modules/kayron/ContactForm.tsx
"use client";
import type React from "react";
import { type FC, useState } from "react";
import type { ContactFormProps } from "@/lib/types";
import "./style.css"; // Import Kayron's specific styles

const KayronContactForm: FC<ContactFormProps> = ({
  heading,
  subheading,
  fields,
  onSubmit,
  submitButtonText,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Optionally reset form fields here: setFormData({});
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">
          {heading}
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subheading}</p>
      </div>
      <div className="max-w-2xl mx-auto">
        <form
          className="black-card-enhanced rounded-3xl p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {fields
              .filter(
                (field) => field.name === "name" || field.name === "email",
              )
              .map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold mb-2 text-gray-200"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type === "subject" ? "text" : field.type} // Handle 'subject' type for input
                    required={field.required}
                    className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                    placeholder={field.placeholder}
                    data-testid={`input-${field.name}`}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}
          </div>
          {fields
            .filter((field) => field.name === "subject")
            .map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-semibold mb-2 text-gray-200"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text" // Subject is a text input
                  required={field.required}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder={field.placeholder}
                  data-testid={`input-${field.name}`}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          {fields
            .filter((field) => field.type === "textarea")
            .map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-semibold mb-2 text-gray-200"
                >
                  {field.label}
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  required={field.required}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 resize-none"
                  placeholder={field.placeholder}
                  data-testid={`textarea-${field.name}`}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
            ))}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-submit-contact"
          >
            <span className="flex items-center justify-center">
              {submitButtonText}
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
                className="lucide lucide-send w-5 h-5 ml-2"
                aria-hidden="true"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                <path d="m21.854 2.147-10.94 10.939"></path>
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default KayronContactForm;
