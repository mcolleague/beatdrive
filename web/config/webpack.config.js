/** @returns {import('webpack').Configuration} Webpack Configuration */

const webpack = require('webpack')

module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  // Work around for Buffer is undefined:
  // https://github.com/webpack/changelog-v5/issues/10
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  )

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  )

  return config
}
