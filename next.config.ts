import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.nba.com",
        port: '',
        pathname: "/logos/nba/streams/L/nss-team-**.png",
      }
    ]
  }
};

export default nextConfig;
