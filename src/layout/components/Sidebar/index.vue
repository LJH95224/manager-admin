<!--
 * @Description: 左侧菜单组件
 * @Autor: Alfred
 * @Date: 2021-05-18 15:15:00
 * @LastEditTime: 2021-06-01 16:10:44
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
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    SidebarItem
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const activeMenu = computed(() => {
      const route = useRoute()
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const routes = computed(() => {
      return store.state.permission.routes
    })
    return { variables, routes, activeMenu }
  }
})
</script>

<style scoped>

</style>
