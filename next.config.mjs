/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net', 'images.unsplash.com'],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
