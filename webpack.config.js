const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Package = require("./package.json");
const isProd = process.argv[process.argv.indexOf("--mode") + 1] === "production";

module.exports = {
  entry: "./src/index.js",
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "next-core-bundle.js",
    publicPath: "/dist/",
    library: "next-core-bundle",
    globalObject: "this",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    "string.prototype.replaceall": {
      commonjs: "string.prototype.replaceall",
      commonjs2: "string.prototype.replaceall",
      amd: "string.prototype.replaceall",
      root: "string.prototype.replaceall"
    }
  },
  stats: "errors-only",
  devtool: isProd ? false : "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(Package.version),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.DEBUG": JSON.stringify(process.env.DEBUG)
    })
  ]
};