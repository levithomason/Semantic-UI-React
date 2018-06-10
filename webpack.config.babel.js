import _ from 'lodash'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import config from './config'

const { paths } = config
const { __DEV__, __PROD__ } = config.compiler_globals

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: paths.docsSrc('index.js'),
    vendor: config.compiler_vendor,
  },
  output: {
    filename: `[name].[${config.compiler_hash_type}].js`,
    path: config.compiler_output_path,
    pathinfo: true,
    publicPath: config.compiler_public_path,
  },
  devtool: config.compiler_devtool,
  externals: {
    'anchor-js': 'AnchorJS',
    '@babel/standalone': 'Babel',
    faker: 'faker',
    'prop-types': 'PropTypes',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOMServer',
  },
  module: {
    noParse: [/\.json$/, /anchor-js/, /@babel\/standalone/],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: __DEV__ ? ['react-hot-loader/babel'] : [],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(config.compiler_globals),
    new webpack.DllReferencePlugin({
      context: paths.base('node_modules'),
      manifest: require(paths.base('dll/vendor-manifest.json')),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
    }),
    new HtmlWebpackPlugin({
      template: paths.docsSrc('index.ejs'),
      filename: 'index.html',
      hash: false,
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
      versions: {
        babel: require('@babel/standalone/package.json').version,
        faker: require('faker/package.json').version,
        jsBeautify: require('js-beautify/package.json').version,
        lodash: require('lodash/package.json').version,
        propTypes: require('prop-types/package.json').version,
        react: require('react/package.json').version,
        reactDOM: require('react-dom/package.json').version,
        suir: require('./package.json').version,
      },
    }),
  ],
  resolve: {
    modules: [paths.base(), 'node_modules'],
    alias: {
      stardust: paths.src(),
    },
  },
}

// ------------------------------------
// Environment Configuration
// ------------------------------------
if (__DEV__) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )

  // Inject HMR runtime into main entry point
  const webpackHotPath = `${config.compiler_public_path}__webpack_hmr`
  const webpackHotMiddlewareEntry = `webpack-hot-middleware/client?${_.map(
    {
      path: webpackHotPath, // The path which the middleware is serving the event stream on
      timeout: 2000, // The time to wait after a disconnection before attempting to reconnect
      overlay: true, // Set to false to disable the DOM-based client-side overlay.
      reload: true, // Set to true to auto-reload the page when webpack gets stuck.
      noInfo: false, // Set to true to disable informational console logging.
      quiet: false, // Set to true to disable all console logging.
    },
    (val, key) => `&${key}=${val}`,
  ).join('')}`

  webpackConfig.entry.app = [webpackHotMiddlewareEntry].concat(webpackConfig.entry.app)
}

if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
  )
}

export default webpackConfig
