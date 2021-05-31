/*
 * @Description: tagview
 * @Autor: Alfred
 * @Date: 2021-05-31 11:17:46
 * @LastEditTime: 2021-05-31 17:17:27
 * @FilePath: \manager-admin\src\store\modules\tagViews\index.ts
 */

import { Module, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'
import { state } from './state'
import { mutations, Mutations } from './mutation'
import { actions, Actions } from './action'
import { StateType } from '@/store'
import type { tagViewTypes } from './state'

export type TagsStore<S = tagViewTypes> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
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

export { tagViewTypes }

export const store: Module<tagViewTypes, StateType> = {
  state,
  mutations,
  actions
}

