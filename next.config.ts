import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "www.django-rest-framework.org",
      },
      {
        protocol: "https",
        hostname: "django-ninja.dev",
      },
      {
        protocol: "https",
        hostname: "www.mabl.com",
      },
    ],
  },
};

export default nextConfig;
