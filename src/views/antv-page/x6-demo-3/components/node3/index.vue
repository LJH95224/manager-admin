<!--
 * @Author: 刘承广 chengguang_liu@cas-pe.com
 * @Date: 2022-06-13 15:50:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-16 09:51:43
 * @FilePath: \main-project\src\views\antv-page\x6-demo-3\components\node3\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="node">
    <img src="@/assets/img/img3.png" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
    console.log('执行了 created')
  },
  mounted() {
    console.log('执行了 mounted')
  },
  methods: {}
})
</script>
<style lang="scss" scoped>
.node {
  position: relative;
}
</style>
