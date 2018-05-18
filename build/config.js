var path = require('path')
var proxy = require('./proxy')

module.exports = {
  path: {
    source: path.join(__dirname, '../src')
  },

  port: 8010,

  dev: {

  },

  prod: {

  },

  proxy: proxy
}
