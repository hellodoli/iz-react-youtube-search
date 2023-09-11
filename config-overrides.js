const webpack = require('webpack')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const WorkBoxPlugin = require('workbox-webpack-plugin')

module.exports = function override(config, env) {
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin),
  )

  const fallback = config.resolve.fallback || {}

  Object.assign(fallback, {
    path: require.resolve('path-browserify'),
    fs: false,
    net: false,
    tls: false,
    process: false,
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
  })

  config.resolve.fallback = fallback

  config.plugins.forEach((plugin) => {
    if (plugin instanceof WorkBoxPlugin.InjectManifest) {
      plugin.config.maximumFileSizeToCacheInBytes = 50 * 1024 * 1024
    }
  })

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  )

  return {
    ...config,
    ignoreWarnings: [/Failed to parse source map/],
  }
}
