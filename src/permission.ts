/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2021-06-01 10:59:17
 * @LastEditTime: 2021-06-01 14:42:37
 * @FilePath: \manager-admin\src\permission.ts
 */
// 引入进度条小组件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import { useStore } from './store'
// import { UserActionTypes } from './store/modules/user/action-types'
import { PermissionActionType } from './store/modules/permission/action-types'
// import { ElMessage } from 'element-plus'

NProgress.configure({ showSpinner: false })

router.beforeEach(() => {
  NProgress.start()
  const store = useStore()
  store.dispatch(PermissionActionType.ACTION_SET_ROUTES, [])
})

router.afterEach(async(to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  NProgress.done()
})
