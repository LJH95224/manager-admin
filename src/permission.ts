/*
 * @Description: 全局路由守卫
 * @Autor: Alfred
 * @Date: 2022-04-08 17:47:53
 * @FilePath: /main-project/src/permission.ts
 */

import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

import router from './route'

// 登陆页面
const loginRoutePath = '/login'
// 首次进入的页面
const defaultRoutePath = '/dashboard'

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  // console.log('beforeEach', to)
  if (token.value) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
    } else {
      next()
    }
  } else {
    if (to.path !== loginRoutePath) {
      next({ path: loginRoutePath })
    }
    next()
  }
})
