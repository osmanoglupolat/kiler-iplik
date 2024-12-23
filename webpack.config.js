const path = require("path");
const PugPlugin = require("pug-plugin");

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, "dist"),
  },

  plugins: [
    new PugPlugin({
      entry: {
        index: "./src/index.pug",
      },
      js: {
        filename: "js/[name].[contenthash:8].js",
      },
      css: {
        filename: "css/[name].[contenthash:8].css",
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader", "postcss-loader"],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },

  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    watchFiles: {
      paths: ["src/**/*.*"],
      options: {
        usePolling: true,
      },
    },
  },
};
