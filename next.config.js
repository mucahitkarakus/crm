/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com"
            }
        ]
    }
}

module.exports = nextConfig
