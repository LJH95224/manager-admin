/*
 * @Description: router 路由配置文件
 * @Autor: Alfred
 * @Date: 2021-05-18 15:12:21
 * @LastEditTime: 2021-06-01 14:47:47
 * @FilePath: \manager-admin\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: Layout,
    meta: { title: '导航', icon: 'el-icon-s-home', breadCrumbShow: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home', alwaysShow: true, affix: true },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '错误页面', icon: 'el-icon-user-solid', alwaysShow: true },
    children: [
      {
        path: '404',
        name: 'notFound',
        meta: { title: '404', noCache: true },
        component: () => import('@/views/error-page/404.vue')
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '用户管理', icon: 'el-icon-user-solid', alwaysShow: true },
    children: [
      {
        path: 'list',
        name: 'userList',
        meta: { title: '用户列表', noCache: true },
        component: () => import('@/views/About.vue')
      },
      {
        path: 'Info',
        name: 'userInfo',
        meta: { title: '用户信息', noCache: true },
        component: () => import('@/views/About.vue')
      }
    ]
  }
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'not-found',
  //   component: () => import('@/views/error-page/404.vue')
  // }
  // // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
  // {
  //   path: '/:pathMatch(.*)',
  //   name: 'bad-not-found',
  //   component: () => import('@/views/error-page/404.vue')
  // }
]
export const asyncRoutes: Array<RouteRecordRaw> = []

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
