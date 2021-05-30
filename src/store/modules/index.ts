/*
 * @Description: In User Settings Edit
 * @Author: Alfred
 * @Date: 2021-05-30 14:39:41
 * @LastEditTime: 2021-05-30 22:51:06
 * @FilePath: \manager-admin\src\store\modules\index.ts
 */
const files = require.context('.', true, /\.ts$/)
const modules: any = {}

files.keys().forEach((key) => {
  if (key === './index.ts') return
  const path = key.replace(/(\.\/|\.ts)/g, '')
  const [namespace, imported] = path.split('/')
  if (!modules[namespace]) {
    modules[namespace] = {
      namespaced: true
    }
  }
  modules[namespace][imported] = files(key).default
})

export default modules
