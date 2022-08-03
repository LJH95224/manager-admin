/*
 * @Description: 用户信息
 * @Autor: Alfred
 * @Date: 2022-03-30 17:07:50
 * @FilePath: /v3Demo/src/mock/module/user/user.ts
 */

import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/apiMock/mockData/menu-list',
    method: 'get',
    response: {
      code: 0,
      data: [
        {
          path: '/',
          component: 'layout',
          name: 'home',
          // redirect: '/dashboard',
          meta: {
            title: '总览',
            icon: 'table',
            parentName: '',
            hideMenu: true
          },
          children: [
            {
              path: 'dashboard',
              component: 'dashboard',
              name: 'Dashboard',
              meta: { title: '总览', icon: 'dashboard', affix: true, parentName: 'home' }
            }
          ]
        },
        {
          path: '/table',
          component: 'layout',
          // redirect: '/table/edit-table',
          name: 'Table',
          meta: {
            title: '表格',
            icon: 'table',
            parentName: ''
          },
          children: [
            {
              path: 'edit-table',
              component: 'edit-table',
              name: 'EditTable',
              // redirect: '/table/edit-table/edit',
              meta: {
                title: '可编辑表格',
                hideMenu: true,
                parentName: 'Table'
              },
              children: [
                {
                  path: 'edit',
                  component: 'edit-table-edit',
                  name: 'EditTable1',
                  meta: {
                    title: '可编辑表格1',
                    noCache: true,
                    parentName: 'EditTable'
                  }
                }
              ]
            },
            {
              path: 'drag-table',
              component: 'drag-table',
              name: 'DragTable',
              meta: {
                title: '可拖拽表格',
                parentName: 'Table'
              }
            }
          ]
        },
        {
          path: '/charts',
          component: 'layout',
          // redirect: '/charts/line-page',
          name: 'Charts',
          meta: {
            title: '图表',
            icon: 'chart',
            parentName: ''
          },
          children: [
            {
              path: 'line-page',
              component: 'line-page',
              name: 'linePage',
              meta: {
                title: '折线图',
                parentName: 'Charts'
              }
            },
            {
              path: 'bar-page',
              component: 'bar-page',
              name: 'barPage',
              meta: {
                title: '柱状图',
                parentName: 'Charts'
              }
            }
          ]
        }
      ]
    }
  }
] as MockMethod[]
