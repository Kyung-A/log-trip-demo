import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_IMAGES_DOMAIN || "localhost",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
