/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-05-31 11:53:48
 * @LastEditTime: 2021-05-31 16:33:12
 * @FilePath: \manager-admin\src\store\modules\tagViews\mutation.ts
 */
import { tagViewTypes, visitedViewsTypes } from './state'
import { MutationTree } from 'vuex'
import { TagsMutationTypes } from './mutation-types'

export type Mutations<S = tagViewTypes> = {
  [TagsMutationTypes.ADD_VISITED_VIEW](state: S, view: visitedViewsTypes): void
  [TagsMutationTypes.ADD_CACHED_VIEW](state: S, view: visitedViewsTypes): void
  [TagsMutationTypes.DEL_VISITED_VIEW](state: S, view: visitedViewsTypes): void
  [TagsMutationTypes.DEL_CACHED_VIEW](state: S, view: visitedViewsTypes): void
  [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](state: S, view: visitedViewsTypes): void
  [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](state: S, view: visitedViewsTypes): void
  [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: S): void
  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: S): void
  [TagsMutationTypes.UPDATE_VISITED_VIEW](state: S, view: visitedViewsTypes): void
}

export const mutations: MutationTree<tagViewTypes> & Mutations = {
  [TagsMutationTypes.ADD_VISITED_VIEW](state: tagViewTypes, view: visitedViewsTypes) {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name'
      })
    )
  },
  [TagsMutationTypes.ADD_CACHED_VIEW](state: tagViewTypes, view: visitedViewsTypes) {
    if (view.name === null) return
    if (state.cachedViews.includes(view.name?.toString())) return
    if (!view.meta?.noCache) {
      state.cachedViews.push(view.name?.toString())
    }
  },
  [TagsMutationTypes.DEL_VISITED_VIEW](state: tagViewTypes, view: visitedViewsTypes) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [TagsMutationTypes.DEL_CACHED_VIEW](state: tagViewTypes, view: visitedViewsTypes) {
    if (view.name === null) return
    const index = state.cachedViews.indexOf(view.name?.toString())
    index > -1 && state.cachedViews.splice(index, 1)
  },
  [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](state: tagViewTypes, view: visitedViewsTypes) {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta?.affix || v.path === view.path
    })
  },
  [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](state: tagViewTypes, view: visitedViewsTypes) {
    if (view.name === null) return
    const index = state.cachedViews.indexOf(view.name?.toString())
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: tagViewTypes) {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta?.affix)
    state.visitedViews = affixTags
  },
  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: tagViewTypes) {
    state.cachedViews = []
  },
  [TagsMutationTypes.UPDATE_VISITED_VIEW](state: tagViewTypes, view: visitedViewsTypes) {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}
