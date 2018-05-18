process.env.NODE_ENV = 'development'

// var fs = require('fs')
// var ora = require('ora')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxy = require('express-http-proxy')

var config = require('../config')
var utils = require('../utils')
// var ProgressPlugin = require('webpack/lib/ProgressPlugin')
var webpackConfig = require('../webpack/dev.config')
const open = require('open')
var app = express()
// 监听端口
var port = config.port
// 代理配置
var proxyTable = config.proxy
var compiler = webpack(webpackConfig)

// 编译webpack
function webpackCompiler () {
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
      chunks: false,
      assets: true,
      cached: true,
      errors: true
    }
  })

  devMiddleware.waitUntilValid(() => {
    const location = 'http://' + utils.getIpV4() + ':' + port
    console.log('\n' + 'Listening at ' + location + '\n')
    open(location)
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler)

  app.use(devMiddleware)
  app.use(hotMiddleware)
}

// 设置后端接口代理
function setProxy () {
  proxyTable.forEach(function (_proxy) {
    app.all(
      _proxy.url,
      proxy(
        _proxy.host,
        decorateProxy.call(this)
      )
    )
  })
}

// 代理装饰
function decorateProxy () {
  return {
    decorateRequest: function (proxyReq, originalReq) {
      return proxyReq
    },
    intercept: function (rsp, data, req, res, callback) {
      callback(null, data)
    }
  }
}

// 设置静态文件目录
function setStatic () {
  app.use('/assets', express.static(path.join(__dirname, '../assets')))
}

// 绑定mock apis
function bindMock () {
  var mockapis = require('../src/mocks')

  for (var key in mockapis) {
    app.all('/' + key + '/*', function (req, res) {
      var _reg = req.path.match(/^\/(api\/\w+)\/(\w+)/i)
      var _callback = require('../src/mocks')[_reg[1]][_reg[2]]

      if (typeof _callback === 'function') {
        if (!req.isPost) {
          res.json(_callback(req.query))
        } else {
          res.json(_callback(req.body))
        }
      } else {
        res.json(_callback)
      }
    })
  }
}

// 启动服务
function startServer () {
  if (config.mock) {
    bindMock()
  } else {
    setProxy()
  }
  webpackCompiler()
  setStatic()

  app.listen(port, function (err) {
    if (err) {
      console.log(err)
      return
    }

  })
}

startServer()
