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
    const baseApiUrl = isProd
      ? "https://dqb3ejqwotj5e.cloudfront.net"
      : "https://d35r9h8hqd5b12.cloudfront.net";

    return [
      {
        source: "/course-api/:path*",
        destination: `${baseApiUrl}/course-api/:path*`,
      },
      {
        source: "/user-api/:path*",
        destination: `${baseApiUrl}/user-api/:path*`,
      },
      {
        source: "/guide-api/:path*",
        destination: `${baseApiUrl}/guide-api/:path*`,
      },
    ];
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*", // Apply to all routes
        headers: [
          {
            key: "X-Robots-Tag",
            value: "all", // Allow crawlers like LinkedIn
          },
          {
            key: "User-Agent-Allow",
            value: "LinkedInBot", // Explicitly allow LinkedInBot
          },
        ],
      },
    ];
  },
};
