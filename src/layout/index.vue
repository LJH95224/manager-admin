<!--
 * @Description: layout 布局页
 * @Author: Alfred
 * @Date: 2021-05-17 22:02:20
 * @LastEditTime: 2021-05-18 15:00:42
 * @FilePath: \managerAdmin\src\layout\index.vue
-->
<template>
  <el-container class="a-100">
    <el-aside width="260px">
      <Sidebar />
    </el-aside>
    <el-main> </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { Sidebar, AppMain, Navbar, TagView } from './components'
</script>
