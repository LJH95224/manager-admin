<!--
 * @Description: 图标和菜单
 * @Autor: Alfred
 * @Date: 2021-05-18 14:19:20
 * @LastEditTime: 2021-05-19 16:18:24
 * @FilePath: \manager-admin\src\layout\components\Sidebar\MenuItem.vue
-->
<template>
  <i v-if="icon" class="sub-el-icon m-r-10" :class="icon"></i>
  <span v-if="title">{{ title }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
}
</style>
