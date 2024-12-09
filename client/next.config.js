const withPlugins = require("next-compose-plugins");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    urlImports: [
      "https://framer.com/m/",
      "https://framerusercontent.com/",
      "https://ga.jspm.io/",
      "https://jspm.dev/",
    ],
  },
  staticPageGenerationTimeout: 3000,
  images: {
    unoptimized: true,
    domains: [
      "www.notion.so",
      "notion.so",
      "images.unsplash.com",
      "pbs.twimg.com",
      "abs.twimg.com",
      "s3.us-west-2.amazonaws.com",
      "transitivebullsh.it",
      "file.notion.so",
      "s3-us-west-2.amazonaws.com",
      "img.notionusercontent.com",
    ],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins([], nextConfig);
