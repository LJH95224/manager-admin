<!--
 * @Description: 标签视图组件
 * @Autor: Alfred
 * @Date: 2021-05-18 09:01:04
 * @LastEditTime: 2021-05-30 14:07:55
 * @FilePath: \manager-admin\src\layout\components\TagsView\index.vue
-->
<template>
  <scroll-pane class="tags-view-scroll">
    <router-link
      v-for="tag in visitedViews"
      ref='tag'
      :key='tag.path'
      :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
      tag='span'
      class="tags-view-item">
      {{ tag.meta.title }}
      <span class="el-icon-close"></span>
    </router-link>
  </scroll-pane>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ScrollPane from './ScrollPane.vue'
import { RouteLocationNormalized } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}
export default defineComponent({
  components: {
    ScrollPane
  },
  setup() {
    const state = reactive({
      visitedViews
    })
    return {}
  }
})
</script>

<style scoped>

</style>
