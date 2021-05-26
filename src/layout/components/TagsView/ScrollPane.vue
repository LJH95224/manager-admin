<!--
 * @Description: tagview 滚动条
 * @Autor: Alfred
 * @Date: 2021-05-26 14:22:21
 * @LastEditTime: 2021-05-26 14:22:36
 * @FilePath: \manager-admin\src\layout\components\TagsView\ScrollPane.vue
-->
<template>
  <el-scrollbar>
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>