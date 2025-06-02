const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['d2ibq52z3bzi2i.cloudfront.net'],
  },
}

module.exports = withNextIntl(nextConfig); 