/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-31 15:13:31
 * @LastEditTime: 2021-05-31 17:17:48
 * @FilePath: \manager-admin\src\store\modules\permission\index.ts
 */
import { Module, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'
import { state } from './state'
import type { PermissionState } from './state'
import { mutations, Mutations } from './mutation'
import { actions, Actions } from './action'
import { StateType } from '@/store'

export type PermissionStore<S = PermissionState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
& {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
};

export { PermissionState }

export const store: Module<PermissionState, StateType> = {
  state,
  mutations,
  actions
}
