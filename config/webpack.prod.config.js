const webpack = require('webpack')
const commonConfig = require('./webpack.common.config')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const process = require('process')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const pageDir = path.resolve(process.cwd(), 'app/page')
const fs = require('fs')
const routers = fs.readdirSync(pageDir).filter(item => !item.includes('.') && item)
const outputPath = path.resolve(process.cwd(), 'build')
const assestPathName = 'assets'
const config = merge(commonConfig, {
  mode: 'production',
  output: {
    path: outputPath,
    chunkFilename: assestPathName + `/[name].[chunkhash:5].js`,
    publicPath: '',
    filename: assestPathName + `/[name].[chunkhash:5].js`
  },
  optimization: {
    runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      chunks: 'all',  // 加载内容
      minSize: {
        javascript: 100000, // 模块要大于30kb才会进行提取
        style: 50000, // 模块要大于50kb才会进行提取
      },
      minChunks: 1,  // 被提取的模块必须被引用1次
      maxAsyncRequests: 6, // 异步加载代码时同时进行的最大请求数不得超过6个
      maxInitialRequests: 4, // 入口文件加载时最大同时请求数不得超过4个
      cacheGroups: {
        defaultVendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: 'false' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: assestPathName + `/[name].[chunkhash:5].css` }),
    new OptimizeCSSAssetsPlugin({})
  ],
  module: {
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(.*\\.common).*\\.css`),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /antd.*\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
              loader: "less-loader",
              options: {
                  lessOptions: {
                      javascriptEnabled: true,
                  }
              }
          }
        ],
        include: /(antd)/
      },
      {
        test: /\.(svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2500,
            outputPath: assestPathName,
            publicPath: './'
          },
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(?!.*\\.anima).*\\.png`),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2500,
            outputPath: assestPathName,
            publicPath: './'
          },
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(.*\\.anima).*\\.png`),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2500,
            outputPath: assestPathName + '/anima',
            publicPath: assestPathName + '/anima'
          },
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(svga|mp4)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2500,
            outputPath: assestPathName,
            publicPath: assestPathName
          },
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      }
    ]
  }
})
routers.map((item) => {
  const tempSrc = path.join(pageDir, `./${item}/index.html`)
  const plugin = new HtmlWebpackPlugin({
    filename: `${item}.html`,
    template: tempSrc,
    inject: true,
    chunks: [item],
    minify: {
      collapseWhitespace: true,//删除空格、换行
    },
  })
  config.entry[item] = [path.resolve(pageDir, `./${item}/index.tsx`)]
  config.plugins.push(plugin)
})

module.exports = config