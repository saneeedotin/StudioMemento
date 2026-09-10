import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['10.144.149.86', 'localhost', 'spa-tab-tribe-wars.trycloudflare.com', '192.168.1.3'],
};

export default nextConfig;
