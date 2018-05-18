const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const baseConfig = require('./base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const htmlGenerator = require('./plugins/htmlGenerator')

baseConfig.entry.index = [
  baseConfig.entry.index,
  path.join(__dirname, './plugins/hotreload.js')
]

module.exports = merge(baseConfig, {
  module: {
    rules: [
      { enforce: 'pre', test: /\.tsx?$/, loader: 'source-map-loader' }
    ]
  },

  devtool: '#source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({filename: '[name].css'})
  ].concat(
    htmlGenerator(config)()
  ),

  mode: 'development'
})
