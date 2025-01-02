/**
 * @file next.config.js
 * @description Next.js configuration file using CommonJS.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["printful.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Example: manipulate client-only settings
    }
    return config;
  },
};

// CommonJS export syntax
module.exports = nextConfig;