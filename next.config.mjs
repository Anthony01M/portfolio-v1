/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "api.microlink.io", // Microlink Image Preview
        ],
    },
    env: {
        DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    }
};

export default nextConfig;
