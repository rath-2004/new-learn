import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/new-learn',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
