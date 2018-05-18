var webpack = require('webpack')
// var path = require('path')
var merge = require('webpack-merge')
var config = require('../config')
var baseConfig = require('./base.config')

var htmlGenerator = require('./plugins/htmlGenerator')

module.exports = merge(baseConfig, {
  devtool: '#eval-source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(
    htmlGenerator(config)
  ),

  mode: 'production'
})
