<!--
 * @Description: vue 微应用
 * @Autor: Alfred
 * @Date: 2022-06-03 15:52:53
 * @FilePath: /framework/v3Demo/src/pages/micro-services/vue-app/amap.vue
-->
<template>
  <div id="alf-mian-view">vueapp</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { loadMicroApp } from 'qiankun'

let microApp = null
onMounted(() => {
  microApp = loadMicroApp(
    {
      name: 'amap-vue',
      entry: 'http://localhost:8001',
      container: '#alf-mian-view',
      props: {
        activeRoute: '/micro-services/vue-app',
        name: '父传子的消息',
        age: 18
      }
    },
    {
      sandbox: {
        experimentalStyleIsolation: true
      }
    }
  )
})
onBeforeUnmount(() => {
  if (microApp) {
    microApp.unmount()
  }
})
</script>

<style scoped>
#alf-mian-view {
  width: 100%;
  height: 100%;
}
</style>
