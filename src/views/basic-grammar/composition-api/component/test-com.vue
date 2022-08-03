<!--
 * @Description: 子组件
 * @Autor: Alfred
 * @Date: 2022-05-17 17:59:14
 * @FilePath: /main-project/src/views/basic-grammar/composition-api/component/test-com.vue
-->

<template>
  <div>
    <p>信息:{{ info }}</p>
    <p class="timeSty">{{ time }}</p>
    <div>
      <el-button type="primary" @click="handle1Click">新增</el-button>
      <el-button style="margin-left: 20px" type="primary" @click="handle2Click">删除</el-button>
      <el-button style="margin-left: 20px" type="primary" @click="handle3Click">跳转首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  info: {
    type: String,
    default: '---'
  },
  time: {
    type: String,
    default: '0分钟'
  }
})

const sex = ref('男')
const info = reactive({
  like: '喜欢李诗情',
  age: 27
})

defineExpose({
  sex,
  info
})

const $myemit = defineEmits(['myAdd', 'myDel'])
const handle1Click = (): void => {
  $myemit('myAdd', '新增的数据')
}
const handle2Click = (): void => {
  $myemit('myDel', '删除的数据')
}
const router = useRouter()
const handle3Click = (): void => {
  router.push({ path: '/home' })
}

const state = reactive({
  color: 'red'
})
</script>

<style scoped lang="scss">
.timeSty {
  color: v-bind('state.color');
}
</style>
