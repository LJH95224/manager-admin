<!--
 * @Description: layout 布局页
 * @Author: Alfred
 * @Date: 2021-05-17 22:02:20
 * @LastEditTime: 2021-05-25 14:06:03
 * @FilePath: \manager-admin\src\layout\index.vue
-->
<template>
  <el-container class="a-100">
    <el-aside width="260px">
      <Sidebar />
    </el-aside>
    <el-main class="app-main">
      <div class="alf-navbar">
        <Navbar></Navbar>
      </div>
      <div class="alf-tagview">
        <tag-view></tag-view>
      </div>
      <app-main></app-main>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sidebar, AppMain, Navbar, TagView } from './components'

export default defineComponent({
  components: {
    Sidebar, AppMain, Navbar, TagView
  }
})
</script>
<style lang="scss" scoped>
.app-main {
  padding: 0;
  .alf-navbar {
    width: 100%;
    height: 50px;
    position: relative;
    overflow: hidden;
    box-sizing: inherit;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  }
  .alf-tagview {
    width: 100%;
    height: 34px;
    box-sizing: inherit;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
}
</style>
