"use client";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import "./style.css";
import type { FC } from "react";
import { SendIcon } from "@/components/BaseLayout"; // Ensure SendIcon is imported
import type { ContactFormProps } from "@/lib/types";

const PixContactForm: FC<ContactFormProps> = ({
  heading,
  subheading,
  fields,
  onSubmit,
  submitButtonText,
}) => {
  const isDev = process.env.NODE_ENV === "development";
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "poop"; // Use a safer default or error
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(
    isDev ? "development_bypass_token" : null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken || (turnstileToken === "poop" && !isDev)) {
      alert("CAPTCHA site key is missing or not configured for production.");
      return;
    }
    if (
      !turnstileToken ||
      (turnstileToken === "development_bypass_token" && !isDev)
    ) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ ...formData, turnstileToken });
      // Clear form after successful submission
      setFormData({});
      setTurnstileToken(null); // Reset Turnstile token
    } finally {
      setIsSubmitting(false);
    }
  };

  // Basic form validation: check if all required fields are filled
  const isFormValid = fields.every(
    (field) => !field.required || (formData[field.name]?.trim() ?? "") !== "",
  );
  const canSubmit = isFormValid && (turnstileToken !== null || isDev);

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          {heading}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {subheading}
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <form
          className="black-card-enhanced rounded-xl p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {fields
              .filter((field) => field.type !== "textarea")
              .map((field) => (
                <div
                  key={field.name}
                  className={field.name === "subject" ? "md:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type === "subject" ? "text" : field.type}
                    required={field.required}
                    className="w-full px-4 py-3 input-enhanced rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                    placeholder={field.placeholder}
                    data-testid={`input-${field.name}`}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}
          </div>

          {fields
            .filter((field) => field.type === "textarea")
            .map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-semibold mb-2 text-foreground"
                >
                  {field.label}
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  required={field.required}
                  className="w-full px-4 py-3 input-enhanced rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground resize-none"
                  placeholder={field.placeholder}
                  data-testid={`textarea-${field.name}`}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
            ))}

          <div className="mt-4">
            {isDev ? (
              <p className="text-muted-foreground text-sm">
                CAPTCHA bypassed in development mode.
              </p>
            ) : (
              <Turnstile
                siteKey={turnstileSiteKey}
                onSuccess={(token: string) => setTurnstileToken(token)}
                options={{ theme: "light" }} // Light theme for Pix
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-submit-contact"
            disabled={!canSubmit || isSubmitting}
          >
            <span className="flex items-center justify-center">
              {isSubmitting ? "Sending..." : submitButtonText}
              {!isSubmitting && <SendIcon className="w-5 h-5 ml-2" />}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PixContactForm;
