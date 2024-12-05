const { parsed: localEnv } = require("dotenv").config({
  path: `.env.${
    process.env.NEXT_APP_ENVIRONMENT === "Production"
      ? "production"
      : "development"
  }`,
});
const webpack = require("webpack");

module.exports = {
  productionBrowserSourceMaps: true,
  output: "export",
  env: localEnv,
  async rewrites() {
    const isProd = process.env.NEXT_APP_ENVIRONMENT === "Production";
    return [
      {
        source: "/course-api/:path*",
        destination: isProd
          ? "https://dqb3ejqwotj5e.cloudfront.net/course-api/:path*"
          : "https://d35r9h8hqd5b12.cloudfront.net/course-api/:path*",
      },
      {
        source: "/user-api/:path*",
        destination: isProd
          ? "https://dqb3ejqwotj5e.cloudfront.net/user-api/:path*"
          : "https://d35r9h8hqd5b12.cloudfront.net/user-api/:path*",
      },
      {
        source: "/guide-api/:path*",
        destination: isProd
          ? "https://dqb3ejqwotj5e.cloudfront.net/guide-api/:path*"
          : "https://d35r9h8hqd5b12.cloudfront.net/guide-api/:path*",
      },
    ];
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
};
