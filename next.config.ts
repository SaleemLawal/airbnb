import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "huqmo5jesy.ufs.sh",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
