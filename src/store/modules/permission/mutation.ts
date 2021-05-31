/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-31 15:13:31
 * @LastEditTime: 2021-05-31 16:30:40
 * @FilePath: \manager-admin\src\store\modules\permission\mutation.ts
 */

import { MutationTree } from 'vuex'
import { PermissionState } from './state'
import { RouteRecordRaw } from 'vue-router'
import { routes as constantRoutes } from '@/router'
import { PermissionMutationType } from './mutation-types'

export type Mutations<S = PermissionState> = {
  [PermissionMutationType.SET_ROUTES](state: S, routes: RouteRecordRaw[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
  [PermissionMutationType.SET_ROUTES](state: PermissionState, routes: RouteRecordRaw[]) {
    state.routes = constantRoutes.concat(routes)
    state.dynamicRoutes = routes
  }
}
