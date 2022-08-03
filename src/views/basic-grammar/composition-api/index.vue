<!--
 * @Description: 折线图
 * @Autor: Alfred
 * @Date: 2022-03-28 15:40:15
 * @FilePath: /main-project/src/views/basic-grammar/composition-api/index.vue
-->
<template>
  <div>
    <div>setup 语法糖</div>
    <div>{{ strRef }}</div>
    <div>
      <span>
        您好，我是{{ userInfo.username }}，今年{{ userInfo.age }}, 我是一个{{
          userInfo.isMan ? '男生' : '女生'
        }}，我所扮演的角色是 {{ userInfo.auth ? userInfo.auth : '无名士' }}
      </span>
      <h3>{{ fullName }}</h3>
      <el-button type="primary" @click="handleClick">点击此处加一岁</el-button>
    </div>
    <test-com
      ref="testcomRef"
      :info="msg"
      time="42分钟"
      @my-add="myAddHander"
      @my-del="myDelHander"
    ></test-com>
    <el-button type="primary" style="margin-top: 10px" @click="getSonHander"
      >获取子组件中的数据</el-button
    >
    <text-vue></text-vue>
  </div>
</template>

<script setup lang="ts">
// 组件命名采用的是大驼峰，引入后不需要在注册，是不是爽歪歪呀!
//在使用的使用直接是小写和横杠的方式连接 test-com
import TestCom from './component/test-com.vue'
import TextVue from './component/text'
import { ref, reactive, computed } from 'vue'
interface userInfoIn {
  username: string
  age: number
  auth: string
  isMan: boolean
}
const strRef = ref<string>('第一次开端')
const userInfo = reactive<userInfoIn>({
  username: '肖鹤云',
  age: 18,
  auth: '',
  isMan: true
})
const handleClick = () => {
  userInfo.age++
  if (userInfo.age > 20) {
    strRef.value = '第' + userInfo.age + '次开端'
  } else {
    fullName.value = '修改fullName'
    console.log(fullName)
  }
}

const myAddHander = (msg: string): void => {
  console.log('新增===> ', msg)
}

const myDelHander = (msg: string): void => {
  console.log('删除===>', msg)
}

const testcomRef = ref()

const getSonHander = () => {
  console.log(testcomRef)
  console.log('获取子组件中的性别', testcomRef.value.sex)
  console.log('获取子组件中的其他信息', testcomRef.value.info)
}

const fullName = computed({
  get() {
    console.log('get函数调用')
    return strRef.value + 'get调用'
  },
  set(value) {
    // 注意，set 修改完值之后显示的数值不会直接改变，除非再次调用get,缓存的值仍然是 之前get的时候的值
    console.log('set函数调用', value)
    return value
  }
})

const msg = '公交车-第一次循环'
</script>

<style scoped></style>
