/*
 * @Description: store Index
 * @Autor: Alfred
 * @Date: 2021-05-18 15:12:21
 * @LastEditTime: 2021-05-31 17:16:53
 * @FilePath: \manager-admin\src\store\index.ts
 */
import { createStore, Store as VuexStore } from 'vuex'
// import modules from './modules'
import { store as tagViews, TagsStore, tagViewTypes } from './modules/tagViews'
import { store as permission, PermissionStore, PermissionState } from './modules/permission'

export type StateType = {
  tagViews: tagViewTypes,
  permission: PermissionState
}

export type Store = TagsStore<Pick<StateType, 'tagViews'>> & PermissionStore<Pick<StateType, 'permission'>>

export const store:VuexStore<StateType> = createStore({
  modules: {
    tagViews,
    permission
  }
})

export function useStore(): Store {
  return store as Store
}
