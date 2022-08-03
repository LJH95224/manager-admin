/*
 * @Description: mock接口数据总览
 * @Autor: Alfred
 * @Date: 2022-03-30 17:06:58
 * @FilePath: /v3Demo/src/mock/index.ts
 */
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/apiMock/api/get',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          'object|2': {
            '310000': '上海市',
            '320000': '江苏省',
            '330000': '浙江省',
            '340000': '安徽省'
          }
        }
      }
    }
  },
  {
    url: '/apiMock/getUser/login',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben1'
      }
    }
  }
] as MockMethod[]
