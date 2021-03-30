const webpack = require('webpack')
const commonConfig = require('./webpack.common.config')
const { merge } = require('webpack-merge')
const path = require('path')
const process = require('process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const ip = require('ip')
const fs = require('fs')
const port = 8087
const host = ip.address()
const appDir = path.resolve(process.cwd(), 'app')
const pageDir = path.resolve(process.cwd(), 'app/page')
const routers = fs.readdirSync(pageDir).filter(item => !item.includes('.') && item)
const childProcess = require('child_process')
let cmd
switch (process.platform) {
  case 'wind32':
    cmd = 'start'
    break
  case 'linux':
    cmd = 'xdg-open'
    break
  case 'darwin':
    cmd = 'open'
    break
}
const config = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  devServer: {
    compress: true,
    hot: true,
    port,
    host,
    historyApiFallback: true,
    proxy: {
      '/v1': {
        target: 'http://livetest1.yuanbobo.com',
        pathRewrite: { '^/v1': '' },
        changeOrigin: true
      }
    },
    after: function (app, server, compiler) {
      childProcess.exec(`${cmd} http://${host}:${port}/${routers[0]}`)
    }
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: 'true' }),
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: [
          'style-loader',
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
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /antd.*\.less$/,
        use: [
          "style-loader",
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
        test: /\.(png|svg|svga|jpg|gif|mp4)$/,
        use: [{
          loader: 'url-loader', // file-loader
          options: { limit: 2500 }
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
    filename: `${item}`,
    template: tempSrc,
    inject: true,
    chunks: [item]
  })
  config.entry[item] = [path.resolve(pageDir, `./${item}/index.tsx`)]
  config.plugins.push(plugin)
})

module.exports = config
