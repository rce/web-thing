const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { merge } = require("webpack-merge")

const srcDir = path.resolve(__dirname, "src")
const distDir = path.resolve(__dirname, "docs")
const isLocal = env => env === "local"

module.exports = env => {
  const config = isLocal(env) ? localConfiguration : productionConfiguration
  return merge(commonConfiguration(env), config)
}

const localConfiguration = {
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
}


// https://webpack.js.org/guides/production
const productionConfiguration = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
}

const commonConfiguration = env => {
  return {
    entry: `${srcDir}/App.tsx`,
    output: {
      filename: isLocal(env) ? "bundle.js" : "bundle.[contenthash].js",
      path: distDir
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ],
          exclude: /node_modules/
        },
        {
          test: /\.jpg$/,
          use: ["file-loader"],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${srcDir}/index.html`,
      })
    ],
  }
}
