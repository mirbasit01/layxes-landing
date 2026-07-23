/** @type {import('next').NextConfig} */
const nextConfig = {
  // Product imagery uses plain <img> with remote picsum URLs, so no next/image
  // remote-pattern config is required.
  reactStrictMode: true,
  eslint: {
    // Lint is run separately via `npm run lint`; don't block production builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
