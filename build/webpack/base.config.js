const path = require('path')
// const tslint = require('./plugins/tslint')
const alias = require('./setup/alias')
const config = require('../config')
const { sync } = require('glob')
const { join } = require('path')
const { loadersDir } = require('./configuration.js')

// 是否开启loader的警告的详细信息
process.traceDeprecation = true

module.exports = {
  entry: {
    index: path.join(config.path.source, 'index.js')
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: alias(config)
  },

  resolveLoader: {
    // fallback: [path.join(__dirname, '../node_modules')]
  },

  module: {
    rules: sync(join(loadersDir, '*.js')).map(loader => require(loader))
  }
}
