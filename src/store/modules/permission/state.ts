/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-31 15:13:31
 * @LastEditTime: 2021-05-31 15:18:15
 * @FilePath: \manager-admin\src\store\modules\permission\state.ts
 */

import { RouteRecordRaw } from 'vue-router'

export interface PermissionState {
    routes: RouteRecordRaw[]
    dynamicRoutes: RouteRecordRaw[]
}

export const state: PermissionState = {
  routes: [],
  dynamicRoutes: []
}
