/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./src/app/styles"],
    modules: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hips.hearstapps.com",
      },
    ],
  },
};

export default nextConfig;
