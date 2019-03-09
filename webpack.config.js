const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

const srcDir = path.resolve(__dirname, "src")
const distDir = path.resolve(__dirname, "dist")

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/",
    contentBase: distDir,
    compress: true,
    port: 8888,
    overlay: true,
    hot: true,
    watchOptions: {
      poll: true,
    },
    proxy: [{
      context: ["/api"],
      target: "http://localhost:3000",
    }],
  },
  entry: {
    app: `${srcDir}/App.jsx`,
  },
  module: {
      rules: [
          {
              test: /\.jsx?/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    presets: [
                      "@babel/preset-env",
                      "@babel/preset-react",
                    ]
                  }
                },
                "eslint-loader"
              ],
              exclude: /node_modules/
          }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`,
    })
  ],
  output: {
      filename: "bundle.js",
      path: distDir
  },
}