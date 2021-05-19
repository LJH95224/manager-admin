/*
 * @Description: vue 配置
 * @Autor: Alfred
 * @Date: 2021-05-18 14:43:46
 * @LastEditTime: 2021-05-19 18:40:39
 * @FilePath: \manager-admin\vue.config.ts
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/manager-admin/' : '/',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'comps': resolve('src/components'),
        'router': resolve('src/router'),
        'store': resolve('src/store'),
        'views': resolve('src/views'),
        'utils': resolve('src/utils'),
        'api': resolve('src/api'),
        'styles': resolve('src/styles')
      }
    }
  },
  chainWebpack(config) {
    config.module
      .test(/\.vue$/)
      .loader('vue-loader')
      .end()
    config.module
      .test(/\.tsx?$/)
      .loader('ts-loader')
      .options({
        appendTsSuffixTo: [/\.vue$/]
      })
      .exclude.add(resolve('/node_modules/'))
      .end()
  }
}
