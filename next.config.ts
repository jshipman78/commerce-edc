import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/why-commerce/our-community',
        destination: '/why-commerce/quality-of-life',
        permanent: true,
      },
      {
        source: '/why-commerce/our-community/:path*',
        destination: '/why-commerce/quality-of-life',
        permanent: true,
      },
      {
        source: '/why-commerce/opportunities',
        destination: '/available-properties',
        permanent: true,
      },
      {
        source: '/why-commerce/opportunities/:path*',
        destination: '/available-properties',
        permanent: true,
      },
      {
        source: '/news/agendas',
        destination: '/transparency/agendas',
        permanent: true,
      },
      {
        source: '/news/agendas/:path*',
        destination: '/transparency/agendas',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
