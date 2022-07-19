/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.websosanh.vn','lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
