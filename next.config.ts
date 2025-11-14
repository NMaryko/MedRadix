import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true, // 301 – постоянный редирект
      },
    ];
  },
};

export default nextConfig;
