/*
 * @Description: 用户数据存储
 * @Autor: Alfred
 * @Date: 2022-04-08 15:24:19
 * @FilePath: /v3Demo/src/store/user.ts
 */

import { defineStore } from 'pinia'
import loginApi from '@/api/login'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'asdfasdfsadfsaafsa',
    userInfo: {}
  }),
  actions: {
    loginPort<T>(params: T) {
      return new Promise((resolve, reject) => {
        loginApi
          .login(params)
          .then((res) => {
            this.token = res.data.token
            this.userInfo = res.data
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})
