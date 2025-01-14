const path = require("path");
const fs = require("fs");
const PugPlugin = require("pug-plugin");

// src klasöründeki tüm .pug dosyalarını otomatik olarak bul ve entry nesnesini oluştur
const pugFiles = fs
  .readdirSync(path.join(__dirname, "src"))
  .filter((file) => file.endsWith(".pug"));

const entry = Object.fromEntries(
  pugFiles.map((file) => [
    path.basename(file, ".pug"), // Dosya adını anahtar olarak kullan
    `./src/${file}`, // Dosyanın yolu
  ])
);

module.exports = {
  mode: 'production',

  performance: {
    hints: false,
  },

  output: {
    path: path.join(__dirname, "dist"),
  },

  plugins: [
    new PugPlugin({
      entry, // Dinamik olarak oluşturulan entry nesnesini kullan
      js: {
        filename: "assets/[name].[contenthash:8].js",
      },
      css: {
        filename: "assets/[name].[contenthash:8].css",
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
        test: /\.(ico|png|jp?g|webp|svg|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.pdf$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash:8][ext]',
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
