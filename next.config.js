const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' *.youtube.com *.vercel.app *.vercel.com *.chec.io;
    child-src *.youtube.com *.google.com;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src * blob: data:;
    media-src 'none';
    font-src 'self' https://fonts.gstatic.com;
    connect-src *;
`;

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\n/g, ''),
    },
    // {
    //     key: 'Referrer-Policy',
    //     value: 'strict-origin-when-cross-origin',
    // },
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
    },
];

module.exports = {
    i18n: {
        locales: ['es'],
        defaultLocale: 'es',
    },
    images: {
        domains: ['cdn.chec.io'],
    },
};

module.exports = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};
