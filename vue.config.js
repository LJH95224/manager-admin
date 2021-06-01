'use strict'
/*
 * @Description: vue 配置
 * @Autor: Alfred
 * @Date: 2021-05-18 14:43:46
 * @LastEditTime: 2021-06-01 15:46:52
 * @FilePath: \manager-admin\vue.config.js
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/manager-admin' : '/',
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
