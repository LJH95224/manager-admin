<!--
 * @Description: layout 布局页
 * @Author: Alfred
 * @Date: 2021-05-17 22:02:20
 * @LastEditTime: 2021-05-19 18:21:58
 * @FilePath: \manager-admin\src\layout\index.vue
-->
<template>
  <el-container class="a-100">
    <el-aside width="260px">
      <Sidebar />
    </el-aside>
    <el-main>
      <Navbar></Navbar>
      <tag-view></tag-view>
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
