import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "img.icons8.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],

    // ✅ prevents optimizer from repeatedly fetching 404s
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
