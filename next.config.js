/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/portfolio",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_AI_MODEL: "deepseek-chat",
    NEXT_PUBLIC_AI_BASE_URL: "https://api.deepseek.com",
    NEXT_PUBLIC_AI_API_KEY: "sk-172a16523d0d414b8eb15454acee4dba",
  },
};

module.exports = nextConfig;
