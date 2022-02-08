const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    config.name = 'test'
    // config.entry = ['babel-polyfill', './src/main.js']
    if (process.env.NODE_ENV === 'production') {
      // 生产环境去console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/,
            threshold: 1024,
            deleteOriginalAssets: false
          })
        ]
      }
    }
  }
}
