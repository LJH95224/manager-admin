/*
 * @Description: 用户登陆
 * @Autor: Alfred
 * @Date: 2022-04-08 11:37:42
 * @FilePath: /v3Demo/src/api/login.ts
 */

import httpRequest from '@/service'

const loginApi = {
  login: <T>(params: T) => {
    return httpRequest({
      method: 'POST',
      url: 'native-api/wuxi/aasms/auth',
      data: params
    })
  },
  getCaptchaImg: () => {
    return httpRequest({
      method: 'get',
      url: 'native-api//wuxi/aasms/auth/captcha'
    })
  },
  getRouterMenuListData: () => {
    return httpRequest({
      method: 'get',
      url: 'apiMock/mockData/menu-list'
    })
  }
}

export default loginApi
