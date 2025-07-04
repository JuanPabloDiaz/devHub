/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'upload.wikimedia.org',
      'flagcdn.com',
      'res.cloudinary.com',
      'via.placeholder.com'
    ],
  },
  // Enable static optimization for better performance
  reactStrictMode: true,
  // Needed for Netlify deployment
  trailingSlash: true,
  // Configure experimental features for proper handling of useSearchParams()
  experimental: {
    // This ensures proper handling of client-side navigation and search params
    serverActions: {
      allowedOrigins: ['localhost:3000']
    },
  }
}

module.exports = nextConfig
