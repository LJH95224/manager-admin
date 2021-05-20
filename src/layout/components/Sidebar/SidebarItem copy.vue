<!--
 * @Description: menuItem的子项
 * @Autor: Alfred
 * @Date: 2021-05-18 15:15:00
 * @LastEditTime: 2021-05-20 15:16:45
 * @FilePath: \manager-admin\src\layout\components\Sidebar\SidebarItem.vue
-->
<template>
  <template v-if="!item.meta.hidden">
    <template v-if='!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children'>
      <sidebar-link :to='resolvePath(theOnlyOneChild.path)'>
        <el-menu-item :index='resolvePath(theOnlyOneChild.path)'>
          <menu-item :icon="theOnlyOneChild.meta?.icon" :title='theOnlyOneChild.meta?.title' />
        </el-menu-item>
      </sidebar-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <menu-item :icon="item.meta?.icon" :title='item.meta?.title' />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest='true'
        :item='child'
        :base-path='resolvePath(child.path)'
        class="nest-menu"
      />
    </el-submenu>
  </template>
</template>

<script >
import path from 'path'
import { defineComponent, computed } from 'vue'
import { isExternal } from '@/utils/validate'
import MenuItem from './MenuItem.vue'
import SidebarLink from './SidebarLink.vue'

export default defineComponent({
  components: {
    MenuItem,
    SidebarLink
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const alwaysShowRootMenu = computed(() => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true
      } else {
        return false
      }
    })

    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...props.item, path: '' }
    })

    const resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return {
      alwaysShowRootMenu,
      showingChildNumber,
      theOnlyOneChild,
      resolvePath
    }
  }
})
</script>

<style scoped>

</style>
