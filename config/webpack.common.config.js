const path = require('path')
const process = require('process')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const pageDir = path.resolve(process.cwd(), 'app/page')
const tsImportPluginFactory = require('ts-import-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  entry:[path.resolve(pageDir, `./index.tsx`)],
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      useEffect: ['react','useEffect'],
      useState: ['react','useState'],
      useCallback: ['react','useCallback'],
      useMemo: ['react','useMemo'],
      useReducer: ['react','useReducer'],
      useRef: ['react','useRef'],
      useContext: ['react','useContext'],
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js'],
      failOnError: true,
      emitWarning: true,
      emitError: true,
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", '.js']
  },
  module: {
    rules: [
      {
      test: /\.ts(x?)$/,
      use: [
        {
          loader:'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
                before: [ tsImportPluginFactory( [{
                    libraryName:'antd',
                    libraryDirectory:'lib',
                    style:true
                }]) ]
            }),
            compilerOptions: {
                module: 'es2015'
            }
          },
        },
        // {
        //   test: /antd.*\.less$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     "css-loader",
        //     {
        //         loader: "less-loader",
        //         options: {
        //             lessOptions: {
        //                 javascriptEnabled: true,
        //             }
        //         }
        //     }
        //   ],
        //   include: /(antd)/
        // },
      ],
      include: [appDir],
      exclude: [nodeModuleDir]
    }]
  }
}