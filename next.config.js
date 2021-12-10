/** @type {import('next').NextConfig} */
module.exports = {
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