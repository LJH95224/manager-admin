<!--
 * @Description: 首页欢迎页面
 * @Autor: Alfred
 * @Date: 2021-05-18 15:12:21
 * @LastEditTime: 2021-06-08 14:49:38
 * @FilePath: \manager-admin\src\views\Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>

<style lang='scss' scoped>
.home {
  text-align: center;
  margin-top: 140px;
}
</style>
