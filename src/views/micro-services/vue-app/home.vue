<!--
 * @Description: 微应用模块
 * @Autor: Alfred
 * @Date: 2022-06-06 10:43:13
 * @FilePath: /framework/v3Demo/src/pages/micro-services/vue-app/home.vue
-->
<template>
  <div id="mirc-box">appp</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { loadMicroApp } from 'qiankun'

let microApp = null
onMounted(() => {
  microApp = loadMicroApp(
    {
      name: 'home-view-vue',
      entry: 'http://localhost:8001',
      container: '#mirc-box',
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

<style lang="scss" scoped></style>
