<!--
 * @Author: 刘承广 chengguang_liu@cas-pe.com
 * @Date: 2022-06-13 15:50:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-15 11:19:36
 * @FilePath: \main-project\src\views\antv-page\x6-demo-2\components\node2\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="node">
    <button class="btn" event="node:delete">x</button>
    <img src="@/assets/img/img2.png" />
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
  .btn {
    display: none;
    position: absolute;
    height: 24px;
    width: 24px;
    line-height: 24px;
    top: 10px;
    right: 10px;
    border: 1px solid #6cc;
  }
  &:hover > .btn {
    display: inline-block;
  }
}
</style>
