/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/top/1",
        permanent: true,
      },
      {
        source: "/page/1",
        destination: "/top/1",
        permanent: true,
      },
    ];
  },
};
