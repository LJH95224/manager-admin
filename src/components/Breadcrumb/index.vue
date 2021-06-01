<!--
 * @Description: 面包屑组件
 * @Autor: Alfred
 * @Date: 2021-05-20 13:54:54
 * @LastEditTime: 2021-06-01 17:15:25
 * @FilePath: \manager-admin\src\components\Breadcrumb\index.vue
-->
<template>
  <el-breadcrumb class="alf-breadcrumb">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbsList"
      :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index == breadcrumbsList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { compile } from 'path-to-regexp'
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'

export default defineComponent({
  setup() {
    const breadcrumbsList = ref<RouteLocationMatched[]>([])
    const router = useRouter()
    const route = useRoute()

    const getBreadcrumb = () => {
      let matched = route.matched.filter((item) => item.meta && item.meta.title && !item.meta.breadCrumbShow)

      const first = matched[0]
      if (first && first.path !== '/' && first.path !== '/home') {
        const routeTmp: any[] = [
          {
            path: '/home',
            meta: { title: '首页' }
          }
        ]
        matched = routeTmp.concat(matched)
      }

      breadcrumbsList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }

    const pathCompile = (path:string) => {
      var toPath = compile(path)
      return toPath(route.params)
    }

    const handleLink = (item: any) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }
    // TODO：跳转页面，会跳转到父级路由

    getBreadcrumb()
    watch(() => route.path, getBreadcrumb)

    return { breadcrumbsList, handleLink }
  }
})
</script>

<style scoped lang='scss'>
.alf-breadcrumb {
  line-height: 46px;
  float: left;
  margin-left: 8px;
  display: inline-block;
}
.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
