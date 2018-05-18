const TSLintPlugin = require('tslint-webpack-plugin')

module.exports = function (baseConfig) {
  if (!baseConfig.plugins) {
    baseConfig.plugins = []
  }

  baseConfig.plugins.push(
    new TSLintPlugin({
      files: ['./src/**/*.ts', './src/**/*.tsx'],
      format: 'stylish'
    })
  )

  return baseConfig
}
