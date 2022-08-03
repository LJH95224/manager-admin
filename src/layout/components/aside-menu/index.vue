<!--
 * @Descrip
 * components: { silderMenu },tion: 菜单栏
 * @Autor: Alfred
 * @Date: 2022-03-28 14:42:15
 * @FilePath: /main-project/src/layout/components/aside-menu/index.vue
-->
<template>
  <el-menu
    class="aside-menu"
    :collapse="isCollapse"
    :default-active="onRoutes"
    active-text-color="#409EFF"
    background-color="#304156"
    text-color="#bfcbd9"
    unique-opened
    router
  >
    <menu-list
      v-for="routeItem in routes"
      :key="routeItem.path"
      :item="routeItem"
      :base-path="routeItem.path"
    ></menu-list>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import menuList from './menu-list.vue'
import { routeConfigStore } from '@/store/route'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const routeConfig = routeConfigStore()
const { isCollapse, menuTree } = storeToRefs(routeConfig)
const routes = menuTree

const route = useRoute()
const onRoutes = computed(() => {
  return route.path
})
</script>

<style scoped lang="scss">
.aside-menu {
  width: 50px;
  height: 100%;
}
.aside-menu:not(.el-menu--collapse) {
  width: 210px;
}
</style>
