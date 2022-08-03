<!--
 * @Description: 总览页面
 * @Autor: Alfred
 * @Date: 2022-03-28 13:55:42
 * @FilePath: /main-project/src/views/dash-board/index.vue
-->
<template>
  <div class="scss-color text-6xl">总览页面</div>
  <el-button>测试</el-button>
  <zk-test-comp :title="'测试组件标题1'"></zk-test-comp>
  <div class="form-box">
    <zk-form-list v-model:value="formConfig"></zk-form-list>
  </div>
</template>

<script setup lang="ts">
// import { zkTestComp } from 'zk-package'
// import FormList from '@/components/form-list'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route)

const formConfig = reactive([
  {
    key: 1,
    label: '姓名：',
    prop: 'name',
    type: 'input',
    value: '121'
  },
  {
    key: 2,
    label: '选择类型：',
    prop: 'type',
    type: 'select',
    value: 'type1',
    placeholder: '请选择类型',
    itemList: [
      {
        label: '类型1',
        value: 'type1'
      },
      {
        label: '类型2',
        value: 'type2'
      },
      {
        label: '类型3',
        value: 'type3'
      }
    ],
    changeFun: changeSelectVal
  }
])
function changeSelectVal(val) {
  console.log('目前选中的值', val)
  formConfig[0].value = val
}
watch(formConfig, (newVal) => {
  console.log('测试', newVal)
})
</script>

<style scoped lang="scss">
.scss-color {
  color: $primary-color;
}
.form-box {
  width: 500px;
  height: 100%;
}
</style>
