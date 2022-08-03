<!--
 * @Description: 顶部结构
 * @Autor: Alfred
 * @Date: 2022-05-17 11:41:40
 * @FilePath: /v3Demo/src/layout/components/top-header/index.vue
-->
<template>
  <div class="top-header">
    <div class="menu-btn">
      <span
        :class="routeConfig.isCollapse ? 'adv-collapse-right' : 'adv-collapse-left'"
        @click="handleClick"
      ></span>
    </div>
    <div class="breadcrumb-box">
      <breadcrumb-comp></breadcrumb-comp>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadcrumbComp from '../breadcrumb-comp/index.vue'
import { routeConfigStore } from '@/store/route'

const routeConfig = routeConfigStore()

const handleClick = () => {
  routeConfig.isCollapse = !routeConfig.isCollapse
}
</script>

<style scoped lang="scss">
.top-header {
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgb(0, 21, 41, 0.8);
  .menu-btn {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0 20px 0 0;
  }
  .breadcrumb-box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
