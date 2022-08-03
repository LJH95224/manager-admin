<!--
 * @Description: 显示内容
 * @Autor: Alfred
 * @Date: 2022-03-29 09:57:39
 * @FilePath: /main-project/src/layout/components/aside-menu/menu-item.vue
-->
<template>
  <i v-if="icon" :class="icon" class="menu-group-icon" />
  <span v-if="title" class="menu-group-title">{{ title }}</span>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
defineProps({
  icon: {
    type: String as PropType<string | undefined>,
    default: ''
  },
  title: {
    type: String as PropType<string | undefined>,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.menu-group-icon {
  margin-right: 5px;
}
</style>
