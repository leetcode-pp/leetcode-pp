/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      less: { javascriptEnabled: true }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
