<!--
 * @Description: 登陆页面
 * @Autor: Alfred
 * @Date: 2022-03-28 11:37:52
 * @FilePath: /main-project/src/views/login-page/index.vue
-->
<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="login-title">系统登录</div>
      <el-form
        ref="loginFormRef"
        class="login-form"
        :model="userForm"
        :rules="rules"
        status-icon
        label-width="80px"
      >
        <el-form-item prop="username" label="用户名：">
          <el-input v-model="userForm.username" clearable placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input
            v-model="userForm.password"
            clearable
            placeholder="密码"
            :type="passwordType"
            @keyup.enter="submitForm"
          />
        </el-form-item>
        <el-form-item prop="auth" label="验证码：">
          <el-input v-model="userForm.auth" clearable placeholder="请输入验证码" />
          <div class="auth-img" @click="getCaptcha">
            <img :src="authImg" alt="验证码" />
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :loading="btnLoading" @click="submitForm">登录</el-button>
          <el-button type="default" @click="submitForm">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import loginApi from '@/api/login'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useMagicKeys } from '@vueuse/core'
import type { FormInstance } from 'element-plus'
import { routeConfigStore } from '@/store/route'
const { Enter } = useMagicKeys()

const loginFormRef = ref<FormInstance>()

// 获取验证码
const authImg = ref<string>('')

const userForm = reactive<userInfo>({
  username: 'lvjh',
  password: 'password@123',
  auth: '',
  p3: ''
})

const passwordType = ref('password')

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  auth: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

function getCaptcha() {
  loginApi.getCaptchaImg().then((res) => {
    const {
      data: { imgData, captchaId }
    } = res
    userForm.p3 = captchaId
    authImg.value = imgData
  })
}

onMounted(() => {
  getCaptcha()
  getRouterData()
})

interface userInfo {
  username: string
  password: string
  auth: string
  p3: string
}

const btnLoading = ref<boolean>(false)

watch(Enter, (v) => {
  if (v && userForm.username && userForm.password && userForm.auth) {
    submitForm()
  }
})

const router = useRouter()
const userStore = useUserStore()
const routeConfig = routeConfigStore()
const submitForm = () => {
  if (!loginFormRef.value) {
    return
  }
  const params = {
    p1: window.btoa(userForm.username),
    p2: window.btoa(userForm.password),
    p4: window.btoa(userForm.auth),
    p3: window.btoa(userForm.p3)
  }
  btnLoading.value = true
  userStore.loginPort(params).then((res) => {
    // console.log('login', res, router)
    btnLoading.value = false
    ElMessage({
      type: 'success',
      message: '登陆成功'
    })
    getRouterData()
  })
}
const getRouterData = () => {
  router.push({
    name: 'Dashboard'
  })
  // routeConfig.getRouterMenuData().then((res) => {
  //   console.log('跳转', res)
  // })
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #235bae;
  background-image: url('../../assets/img/login_bg.jpg');
  background-size: cover;
}

.login-title {
  width: 100%;
  font-size: 20px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}

.login-form {
  padding: 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 20%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #85155c;
}
</style>
