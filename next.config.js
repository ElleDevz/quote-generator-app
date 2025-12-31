/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/quote-generator-app',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
