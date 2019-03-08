const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  // hot-client
  entry: ['./client/polyfills.js', './client/index.js'],
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              modules: true,
              localIdentName: '[local]_[sha1:hash:base64:5]',
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
});
