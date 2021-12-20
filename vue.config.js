/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  // process.env.NODE_ENV === 'production'
  //   ? 'https://cdn.jsdelivr.net/gh/leetcode-pp/leetcode-pp@gh-pages/'
  //   : '/',
  css: {
    loaderOptions: {
      less: { javascriptEnabled: true }
    }
  },
  devServer: {
    proxy: {
      '/list': {
        target: 'http://api.bilibili.cn/',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/list': ''
        }
      },
      '/userVideo': {
        target: 'https://space.bilibili.com/ajax/member/',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/userVideo': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.devServer.disableHostCheck(true)
    // config.output.chunkFilename('js/[id].[contenthash:8].js')
    // config.optimization.runtimeChunk = 'single'
  }
}
