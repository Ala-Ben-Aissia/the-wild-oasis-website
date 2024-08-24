/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'npfwfiiwxvhfiggqjqdo.supabase.co',
        pathname: '/storage/v1/object/public/cabins-images/**',
      },
    ],
  },
}

export default nextConfig
