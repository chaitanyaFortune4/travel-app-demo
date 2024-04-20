/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hare-media-cdn.tripadvisor.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
