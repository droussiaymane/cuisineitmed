const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
]

module.exports = {
 eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
    env: {
      url: 'https://cuisinebackitmed.herokuapp.com',
      dpi_uri : 'http://localhost:3001/'
    },
    api: {
      bodyParser: false,
    },
async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  }
  }