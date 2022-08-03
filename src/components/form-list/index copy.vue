<!--
 * @Description: 动态表单
 * @Autor: Alfred
 * @Date: 2022-06-21 14:45:01
 * @FilePath: /main-project/src/components/form-list/index.vue
-->
<template>
  <div class="form-list border-2 border-cyan-500">
    <el-form :model="form" label-width="120px">
      <el-form-item v-for="item in compList" :key="item.key" :prop="item.prop" :label="item.label">
        <component :is="item.type" v-bind="item"></component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import inputBox from './components/input-box.vue'
const compList = reactive([
  {
    key: 1,
    label: '姓名：',
    prop: 'name',
    type: inputBox,
    value: '1123'
  }
])
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
</script>

<style scoped lang="scss">
.form-list {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
