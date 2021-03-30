const path = require('path')
const process = require('process')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  entry: {},
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
  ],
  resolve: {
    extensions: [".ts", ".tsx", '.js']
  },
  module: {
    rules: [{
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
      }
      ],
      include: [appDir],
      exclude: [nodeModuleDir]
    }]
  }
}