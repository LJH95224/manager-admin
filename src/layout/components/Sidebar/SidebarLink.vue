<!--
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-18 15:15:00
 * @LastEditTime: 2021-05-20 15:44:58
 * @FilePath: \manager-admin\src\layout\components\Sidebar\SidebarLink.vue
-->

<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to='to'>
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      isExternal
    }
  }
})
</script>
