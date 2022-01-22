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
        return [{
            source: "/",
            destination: "/page/1",
            permanent: true,
        }, ];
    },
};