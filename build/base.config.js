const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');

module.exports = {
  entry: {
    index: './client/index.js',
    polyfills: './client/polyfills.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          name: 'imgs/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.css'],
    alias: {
      // shorten directories paths
      '@@': path.resolve(__dirname, '..', 'client/'),
      '@module': path.resolve(__dirname, '..', 'client/module/'),
      '@util': path.resolve(__dirname, '..', 'client/util/'),
      '@com': path.resolve(__dirname, '..', 'client/component/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      filename: 'index.generated.html',
      template: './html/index.html',
      chunks: ['index', 'main'],
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.domain': JSON.stringify(config.domain)
    }),
    new CopyWebpackPlugin([
      path.resolve(__dirname, '../static/**/*'),
      // normalize
      {
        from: path.resolve(
          __dirname,
          '../node_modules/normalize.css/normalize.css'
        ),
        to: path.resolve(__dirname, '../dist/client/static')
      }
    ])
  ],
  node: {
    fs: 'empty',
    path: 'empty'
  }
};
