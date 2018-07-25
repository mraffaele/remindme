const path = require("path");
const ElectronConnectPlugin = require("webpack-electron-connect-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Promise = require("es6-promise-promise");
const webpack = require("webpack");

module.exports = (env, argv) => {
  return {
    entry: {
      index: "./src/index.tsx"
    },
    output: {
      path: path.resolve(__dirname),
      filename: "./app.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|js)$/,
          exclude: /node_modules/,
          use: ["ts-loader"]
        },
        {
          test: /\.(mp3)$/,
          use: ["file-loader"]
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                data: (() => `$environment: ${argv.mode};`)()
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        Promise: "es6-promise"
      }),
      (() => {
        if (argv.mode === "production") {
          return () => {};
        }
        return new ElectronConnectPlugin({
          type: "reload",
          options: {}
        });
      })(),
      new HTMLWebpackPlugin({
        template: "./src/index.html",
        env: argv.mode
      })
    ],
    target: "electron-renderer"
  };
};
