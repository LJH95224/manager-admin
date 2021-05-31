/*
 * @Description: Vue store 声明文件
 * @Author: Alfred
 * @Date: 2021-05-30 14:15:43
 * @LastEditTime: 2021-05-31 15:54:44
 * @FilePath: \manager-admin\src\@type\vue-proptery.d.ts
 */
// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]
  }
}
