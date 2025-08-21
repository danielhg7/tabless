import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https:gourmedia-content.b-cdn.net/**'),
      new URL('https://gour.media/**'),
      new URL('https://res.cloudinary.com/**'),
      new URL('https://cdn.misitio.com/**')
    ],
  }
};

export default nextConfig;
