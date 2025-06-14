const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ru-msk-dr3-1.store.cloud.mts.ru',
                pathname: '/store/images/items/**',
            },
            {
                protocol: 'https',
                hostname: 'app.plex-crm.ru',
                pathname: '/images/items/e2f/**',
            },
            {
                protocol: 'https',
                hostname: 'app.plex-crm.ru',
                pathname: '/images/items/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/cars/:path*',
                destination: 'http://plex-parser.ru-rating.ru/cars/:path*',
            },
        ]
    },
    trailingSlash: false,
};

module.exports = nextConfig;
