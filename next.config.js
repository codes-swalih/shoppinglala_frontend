// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// });
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export if you don't need server-side features
  output: 'standalone',
  // Configure environment variables
  env: {
    BASE_URL: process.env.BASE_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    BASE_CURRENCY: process.env.BASE_CURRENCY,
    SHIPPING_FEE: process.env.SHIPPING_FEE,
    JWT_SECRET: process.env.JWT_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BASE_URL}/api/:path*`,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to load these modules on the client side
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
  images: {
    domains: ['nextall.vercel.app"', 'res.cloudinary.com']
  }
  
};

module.exports = nextConfig;

// remotePatterns: [
//   {
//     protocol: 'https',
//     hostname: 'res.cloudinary.com',
//     port: '',
//     pathname: ''
//   },
//   {
//     protocol: 'https',
//     hostname: 'nextall.vercel.app',
//     port: '',
//     pathname: ''
//   }
// ]
