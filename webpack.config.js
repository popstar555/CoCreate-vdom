// Webpack uses this to work with directories
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let isProduction = process.env.NODE_ENV === 'production';

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: {
    'CoCreate-vdom': './src/virtualDom.js',
    // 'demo1': './demo/demo1.js',
  },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },

  // add source map
  ...(isProduction ? {} : { devtool: 'eval-source-map' }),

  // add uglifyJs
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        // get options: https://github.com/mishoo/UglifyJS
        drop_console: isProduction
      },
    })],
  },
};
