/*
 * @Description: 封装请求方法
 * @Autor: Alfred
 * @Date: 2022-04-08 10:48:01
 * @FilePath: /v3Demo/src/service/index.ts
 */

// index.ts
import type { RequestConfig } from './request/types'
import Request from './request'

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 实例请求拦截器
    requestInterceptors: (config) => {
      return config
    },
    // 实例响应拦截器
    responseInterceptors: (result) => {
      return result
    }
  }
})

interface httpRequestConfig<T> extends RequestConfig {
  data?: T
}
interface httpResponse<T> {
  code: number
  message: string
  data: T
}

const httpRequest = <D, T = any>(config: httpRequestConfig<D>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<httpResponse<T>>(config)
}

export default httpRequest
