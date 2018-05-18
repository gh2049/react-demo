const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ConcatPlugin = require('webpack-concat-plugin')

module.exports = function (config) {
  return function () {
    const HtmlWebpackPluginConf = {
      filename: 'index.html',
      template: path.join(__dirname, './template.ejs'),
      templateParameters: {
        urls: 'jquery'
      },
      inject: 'body',
      chunks: ['index'],
      minify: {
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
      },
      params: {}
    }

    const ConcatPluginConf = {
      uglify: true,
      sourceMap: false,
      name: 'edit',
      outputPath: 'prod/assets/javascripts',
      fileName: '[name].[hash:8].js',
      filesToConcat: [ './src/assets/javascripts/jquery.js' ],
      attributes: { async: false }
    }

    return [
      new HtmlWebpackPlugin(HtmlWebpackPluginConf),
      // new ConcatPlugin(ConcatPluginConf)
    ]
  }
}
