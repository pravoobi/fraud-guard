/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  ...(isGitHubPages && {
    basePath: '/fraud-guard',
    assetPrefix: '/fraud-guard/',
  }),
  images: {
    unoptimized: true
  }
};

export default nextConfig;
