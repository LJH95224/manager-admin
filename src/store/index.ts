/*
 * @Description: 状态管理器
 * @Autor: Alfred
 * @Date: 2022-03-28 11:41:55
 * @FilePath: /v3Demo/src/store/index.ts
 */
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'

const store = createPinia()
store.use(
  createPersistedState({
    storage: window.sessionStorage
  })
)
export default store
