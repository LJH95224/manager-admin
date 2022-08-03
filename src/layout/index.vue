<!--
 * @Description: 布局
 * @Autor: Alfred
 * @Date: 2022-03-28 13:45:40
 * @FilePath: /main-project/src/layout/index.vue
-->
<template>
  <el-container class="common-layout">
    <el-aside class="common-aside">
      <aside-menu></aside-menu>
    </el-aside>
    <el-container class="common-container">
      <el-header class="common-container-header">
        <top-header></top-header>
        <tag-view></tag-view>
      </el-header>
      <el-main class="common-container-main">
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppMain from './components/app-main/index.vue'
import AsideMenu from './components/aside-menu/index.vue'
import TopHeader from './components/top-header/index.vue'
import TagView from './components/tag-view/index.vue'
</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100%;
  display: flex;
  .common-aside {
    width: auto;
    background: #ccc;
  }
  .common-container {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    &-header {
      width: 100%;
      height: 85px;
      padding: 0;
      position: relative;
      overflow: hidden;
      box-sizing: inherit;
      background: #fff;
      // background: red;
    }
    &-main {
      width: 100%;
      flex: 1;
      padding: 0px;
      // background: blue;
    }
  }
}
</style>
