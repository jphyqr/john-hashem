require("dotenv").config();
const webpack = require("webpack");
const keys = require("./config/keys");
module.exports = {
  env: {
    TWITTER_ACCESS_TOKEN: keys.twitterKey,
    TWITTER_BEARER_TOKEN: keys.twitterBearerToken,
    TWITTER_ACCESS_TOKEN_SECRET: keys.twitterSecret,
    TWITTER_CONSUMER_KEY: keys.twitterConsumerKey,
    TWITTER_CONSUMER_SECRET: keys.twitterConsumerSecret,
  },
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
