/*
 * @Description: router 路由配置文件
 * @Autor: Alfred
 * @Date: 2021-05-18 15:12:21
 * @LastEditTime: 2021-05-25 16:20:08
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
        meta: { title: '首页', icon: 'el-icon-s-home', alwaysShow: true },
        component: () => import('@/views/Home.vue')
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
        meta: { title: '用户列表', icon: 'el-icon-user-solid' },
        component: () => import('@/views/About.vue')
      },
      {
        path: 'Info',
        meta: { title: '用户信息', icon: 'el-icon-user-solid' },
        component: () => import('@/views/About.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
