/*
 * @Description: 实例拦截器是为了保证封装的灵活性，因为每一个实例中的拦截后处理的操作可能是不一样的，所以在定义实例时，允许我们传入拦截器。
 * @Autor: Alfred
 * @Date: 2022-04-08 10:02:28
 * @FilePath: /v3Demo/src/service/request/types.ts
 */

import type { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: AxiosError) => AxiosError
  // 响应拦截
  responseInterceptors?: <T = AxiosResponse>(config: T) => T
  responseInterceptorsCatch?: (err: AxiosError) => AxiosError
}

// 自定义传入参数
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
}
