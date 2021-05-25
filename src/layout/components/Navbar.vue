<!--
 * @Description: 顶部菜单栏
 * @Autor: Alfred
 * @Date: 2021-05-18 09:00:08
 * @LastEditTime: 2021-05-25 14:48:33
 * @FilePath: \manager-admin\src\layout\components\Navbar.vue
-->
<template>
  <div class="navbar_left">
    <div class="navbar_left_btn" @click="toggleClick">
      <i v-if="!isActive" class="alf-icon el-icon-s-fold"></i>
      <i v-else class="alf-icon el-icon-s-unfold"></i>
    </div>
    <Breadcrumb />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
export default defineComponent({
  components: {
    Breadcrumb
  },
  setup() {
    const isActive = ref(false)
    function toggleClick() {
      isActive.value = !isActive.value
    }

    return { isActive, toggleClick }
  }
})
</script>

<style scoped lang='scss'>
.navbar_left {
  &_btn {
    padding: 0 15px;
    line-height: 46px;
    float: left;
    .alf-icon {
      font-size: 20px;
      position: relative;
      top: 2px;
    }
  }
}
</style>
