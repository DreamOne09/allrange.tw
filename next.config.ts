import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: "/allrange.tw",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
