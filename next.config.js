const withSvgr = require("next-plugin-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['media.istockphoto.com','storage.googleapis.com'],
      // remotePatterns:['media.istockphoto.com','storage.googleapis.com']
    },
  };

module.exports = withSvgr(nextConfig);
