<!--
 * @Description: 面包屑组件
 * @Autor: Alfred
 * @Date: 2022-05-18 16:53:02
 * @FilePath: /v3Demo/src/layout/components/breadcrumb-comp/index.vue
-->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbsList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index == breadcrumbsList.length - 1"
        class="no-redirect"
        >{{ item.meta.title }}</span
      >
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { compile } from 'path-to-regexp'
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'

const breadcrumbsList = ref<RouteLocationMatched[]>([])
const router = useRouter()
const route = useRoute()

const getBreadcrumb = (): void => {
  const matched = route.matched.filter(
    (item) => item.meta && item.meta.title && !item.meta.hideMenu === true
  )

  const first = matched[0]
  if (first && first.path !== '/' && first.path !== '/home') {
    const routeTmp: any = {
      path: '/home',
      meta: { title: '首页' }
    }
    matched.unshift(routeTmp)
  }

  breadcrumbsList.value = matched.filter(
    (item) => item.meta && item.meta.title && !item.meta.hideMenu === true
  )
}

const pathCompile = (path: string) => {
  const toPath = compile(path)
  console.log(path, route.params)
  return toPath(route.params)
}

getBreadcrumb()
watch(() => route.path, getBreadcrumb)

const handleLink = (item: any): void => {
  const { redirect, path } = item
  console.log(path, pathCompile(path))
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}
</script>

<style scoped></style>
