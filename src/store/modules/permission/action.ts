/* eslint-disable */
/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-31 15:13:31
 * @LastEditTime: 2021-06-08 15:29:09
 * @FilePath: \manager-admin\src\store\modules\permission\action.ts
 */
import { ActionTree, ActionContext } from 'vuex'
import { StateType } from '@/store'
import { PermissionState } from './state'
import { Mutations } from './mutation'
import { asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { PermissionActionType } from './action-types'
import { PermissionMutationType } from './mutation-types'

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, StateType>, 'commit'>

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      }
    })
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface Actions {
    [PermissionActionType.ACTION_SET_ROUTES](
      { commit }: AugmentedActionContext
      , roles: string[]): void
}

export const actions: ActionTree<PermissionState, StateType> & Actions = {
  [PermissionActionType.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext
    , roles: string[]) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    commit(PermissionMutationType.SET_ROUTES, accessedRoutes)
  }
}
