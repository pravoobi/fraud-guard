/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/fraud-guard',
  assetPrefix: '/fraud-guard/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
