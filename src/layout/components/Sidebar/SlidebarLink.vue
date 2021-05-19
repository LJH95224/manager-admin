<!--
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-18 15:15:00
 * @LastEditTime: 2021-05-18 16:36:34
 * @FilePath: \manager-admin\src\layout\components\Sidebar\SlidebarLink.vue
-->
<template>
   <component :is="type" v-bind="linkProps(to)">
     <slot />
  </component>
</template>

<script lang="ts">
import { isExternal as isExt } from '@/utils/validate'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const isExternal = computed(() => isExt(props.to))

    // type是一个计算属性
    const type = computed(() => {
      if (isExternal.value) {
        return 'a'
      }
      return 'router-link'
    })
    const linkProps = (to: string) => {
      if (isExternal.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
    }
    return { type, linkProps }
  }
})
</script>

<style scoped>

</style>
