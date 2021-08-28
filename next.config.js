require("dotenv").config();
const webpack = require("webpack");
module.exports = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "s3.us-east-2.amazonaws.com",
      "content.homenetiol.com",
      "items-images-production.s3.us-west-2.amazonaws.com",
      "dl.airtable.com",
    ],
  },
  webpack: (config, { isServer }) => {
    // if (isServer) {
    //   require("./scripts/generate-sitemap");
    // }
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
};
