/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-31 11:53:22
 * @LastEditTime: 2021-05-31 16:34:12
 * @FilePath: \manager-admin\src\store\modules\tagViews\action.ts
 */
import { ActionTree, ActionContext } from 'vuex'
import { tagViewTypes, visitedViewsTypes } from './state'
import { StateType } from '@/store'
import { Mutations } from './mutation'
import { TagsActionTypes } from './action-types'
import { TagsMutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<tagViewTypes, StateType>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<tagViewTypes, StateType>, 'commit'>

export interface Actions {
  [TagsActionTypes.ACTION_ADD_VIEW](
    { commit }: AugmentedActionContext,
    view: visitedViewsTypes
  ): void
  [TagsActionTypes.ACTION_ADD_VISITED_VIEW](
    { commit }: AugmentedActionContext,
    view: visitedViewsTypes
  ): void
  [TagsActionTypes.ACTION_DEL_VIEW](
    { commit }: AugmentedActionContext,
    view: visitedViewsTypes
  ): void
  [TagsActionTypes.ACTION_DEL_OTHER_VIEW](
    { commit }: AugmentedActionContext,
    view: visitedViewsTypes
  ): void
  [TagsActionTypes.ACTION_DEL_CACHED_VIEW](
    { commit }: AugmentedActionContext,
    view: visitedViewsTypes
  ): void
  [TagsActionTypes.ACTION_OTHER_VIEWS](
    { commit }: AugmentedActionContext,
    view: visitedViewsTypes
  ): void
  [TagsActionTypes.ACTION_DEL_ALL_VIEWS](
    { commit }: NoAugmentedActionContext
  ): void
  [TagsActionTypes.ACTION_DEL_ALL_CACHED_VIEWS](
    { commit }: NoAugmentedActionContext,
  ): void
  [TagsActionTypes.ACTION_UPDATE_VISITED_VIEW](
    { commit }: AugmentedActionContext,
    view: visitedViewsTypes
  ): void
}

export const actions: ActionTree<tagViewTypes, StateType> & Actions = {
  async [TagsActionTypes.ACTION_ADD_VIEW]({ commit }, view: visitedViewsTypes) {
    commit(TagsMutationTypes.ADD_VISITED_VIEW, view)
    commit(TagsMutationTypes.ADD_CACHED_VIEW, view)
  },
  [TagsActionTypes.ACTION_ADD_VISITED_VIEW]({ commit }, view: visitedViewsTypes) {
    commit(TagsMutationTypes.ADD_VISITED_VIEW, view)
  },
  [TagsActionTypes.ACTION_DEL_VIEW]({ commit }, view: visitedViewsTypes) {
    commit(TagsMutationTypes.DEL_VISITED_VIEW, view)
    commit(TagsMutationTypes.DEL_CACHED_VIEW, view)
  },
  [TagsActionTypes.ACTION_DEL_OTHER_VIEW]({ commit }, view: visitedViewsTypes) {
    commit(TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
    commit(TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS, view)
  },
  [TagsActionTypes.ACTION_DEL_CACHED_VIEW]({ commit }, view: visitedViewsTypes) {
    commit(TagsMutationTypes.DEL_CACHED_VIEW, view)
  },
  [TagsActionTypes.ACTION_OTHER_VIEWS]({ commit }, view: visitedViewsTypes) {
    commit(TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
    commit(TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS, view)
  },
  [TagsActionTypes.ACTION_DEL_ALL_VIEWS]({ commit }) {
    commit(TagsMutationTypes.DEL_ALL_VISITED_VIEWS)
    commit(TagsMutationTypes.DEL_ALL_CACHED_VIEWS)
  },
  [TagsActionTypes.ACTION_DEL_ALL_CACHED_VIEWS]({ commit }) {
    commit(TagsMutationTypes.DEL_ALL_CACHED_VIEWS)
  },
  [TagsActionTypes.ACTION_UPDATE_VISITED_VIEW]({ commit }, view: visitedViewsTypes) {
    commit(TagsMutationTypes.UPDATE_VISITED_VIEW, view)
  }
}
