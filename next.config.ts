import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['10.144.149.86', 'localhost', 'spa-tab-tribe-wars.trycloudflare.com'],
};

export default nextConfig;
