/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' since you need dynamic data
  images: {
    unoptimized: false, // Enable proper image optimization
  },
  // Add rewrites to proxy API requests in development
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // Your Express server
      },
    ];
  },
};

export default nextConfig;
