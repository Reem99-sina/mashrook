const withSvgr = require("next-plugin-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['media.istockphoto.com','storage.googleapis.com',"mashrook.s3.amazonaws.com","mashrook-project.s3.amazonaws.com","mashrook-project.s3.us-east-1.amazonaws.com"]
      // remotePatterns:['media.istockphoto.com','storage.googleapis.com']
    }
  };

module.exports = withSvgr(nextConfig);
