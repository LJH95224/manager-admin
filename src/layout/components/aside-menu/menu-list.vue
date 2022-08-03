<!--
 * @Description: 菜单详情
 * @Autor: Alfred
 * @Date: 2022-03-28 15:15:12
 * @FilePath: /main-project/src/layout/components/aside-menu/menu-list.vue
-->
<template>
  <template v-if="!item.meta?.hidden">
    <el-menu-item v-if="!item.children || !item.children.length" :index="basePath">
      <menu-item :icon="item.meta?.icon" :title="item.meta?.title" />
    </el-menu-item>
    <el-sub-menu v-else :index="item.path" popper-append-to-body>
      <template #title>
        <menu-item :icon="item.meta?.icon" :title="item.meta?.title"></menu-item>
      </template>
      <menu-list
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import menuItem from './menu-item.vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const resolvePath = (path: string | undefined) => {
  // console.log(path)
  if (path && path.indexOf('/:morePath*') > -1) {
    path = path.replace('/:morePath*', '')
  }
  if (path) {
    return props.basePath + '/' + path
  }
  return props.basePath
}
</script>
