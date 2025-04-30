import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allows to see the github profile picture
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

export default nextConfig;
