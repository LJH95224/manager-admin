/*
 * @Description: 验证的方法
 * @Autor: Alfred
 * @Date: 2021-05-18 14:14:19
 * @LastEditTime: 2021-05-18 14:15:20
 * @FilePath: \backManager\src\utils\validate.ts
 */
/**
 * @Author: Alfred
 * @description: 验证路径是不是http地址
 * @param {string} path
 * @return {*}
 */
export function isExternal (path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}
