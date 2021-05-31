/*
 * @Description: 标签页
 * @Author: Alfred
 * @Date: 2021-05-30 14:09:29
 * @LastEditTime: 2021-05-31 14:05:58
 * @FilePath: \manager-admin\src\store\modules\tagViews\state.ts
 */

import { RouteLocationNormalized } from 'vue-router'
export interface visitedViewsTypes extends Partial<RouteLocationNormalized> {
  title?: string
}
export interface tagViewTypes {
  visitedViews: visitedViewsTypes[]
  cachedViews: (string | undefined)[]
}

export const state: tagViewTypes = {
  visitedViews: [],
  cachedViews: []
}
