'use strict'
/*
 * @Description: vue 配置
 * @Autor: Alfred
 * @Date: 2021-05-18 14:43:46
 * @LastEditTime: 2021-05-20 09:59:41
 * @FilePath: \manager-admin\vue.config.js
 */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/manager-admin/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
  // chainWebpack (config) {
  //   config.module
  //     .rule('vue')
  //     .test(/\.vue$/)
  //     .loader('vue-loader')
  //     .end()
  //   config.module
  //     .rule('ts')
  //     .test(/\.tsx?$/)
  //     .loader('ts-loader')
  //     .options({
  //       appendTsSuffixTo: [/\.vue$/]
  //     })
  //     .exclude.add(resolve('/node_modules/'))
  //     .end()
  // }
}
