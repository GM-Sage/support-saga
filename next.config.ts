import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['printful.com'], // Add other external image domains as needed
  },
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    PRINTFUL_API_KEY: process.env.PRINTFUL_API_KEY,
  },
};

export default nextConfig;
