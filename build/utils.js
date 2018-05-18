var os = require('os')

module.exports = {
  /**
   * 判断当前系统是否是Mac
   */
  isMac: function () {
    return os.platform() === 'darwin'
  },

  /**
   * 获取当前机器的ipv4
   * @returns IPv4
   */
  getIpV4: function () {
    var interfaces = require('os').networkInterfaces()

    for (var devName in interfaces) {
      var iface = interfaces[devName]

      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
  },

  /**
   * 获取nodejs命令行参数
   * @returns {string} 命令行参数json串
   */
  getArgs: function () {
    try {
      return JSON.parse(process.env.npm_config_argv).original
    } catch (e) {
      return {}
    }
  }
}
