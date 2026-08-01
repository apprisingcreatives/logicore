import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@logicore/shared', '@logicore/domain'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
