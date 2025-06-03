import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
      'd2ibq52z3bzi2i.cloudfront.net',
      'realitypuchyr-estate-photos.s3.eu-central-1.amazonaws.com'
    ],
  },
};

export default nextConfig;
