import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import modules from './modules'
import { tagViewTypes } from './modules/tagViews/state.ts'

type StateType = {
  tagView: tagViewTypes
}

export const key: InjectionKey<Store<StateType>> = Symbol()

export const store = createStore({
  modules: {
    ...modules
  }
})
