<!--
 * @Description: 左侧菜单组件
 * @Autor: Alfred
 * @Date: 2021-05-18 15:15:00
 * @LastEditTime: 2021-05-19 15:06:37
 * @FilePath: \manager-admin\src\layout\components\Sidebar\index.vue
-->
<template>
  <el-menu
    class="h-100"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :default-active="activeMenu"
    unique-opened
    :active-text-color="variables.menuActiveText"
    mode="vertical"
  >
    <sidebar-item
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import variables from '@/styles/variables.module.scss'
import SidebarItem from './SidebarItem.vue'
import { routes } from '@/router'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    SidebarItem
  },
  setup () {
    const activeMenu = computed(() => {
      const route = useRoute()
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    return { variables, routes, activeMenu }
  }
})
</script>

<style scoped>

</style>
