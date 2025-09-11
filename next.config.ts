import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/es", // Redirect to your default locale (e.g., Spanish)
        permanent: true, // Use false if it's a temporary redirect
      },
    ];
  },
};

export default nextConfig;
