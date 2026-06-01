/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'akkapol-portfolio-2026.vercel.app',
          },
        ],
        destination: 'https://akkapol-systems.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
