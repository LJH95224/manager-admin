/*
 * @Description: 路由配置
 * @Autor: Alfred
 * @Date: 2022-03-28 11:46:04
 * @FilePath: /main-project/src/route/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// vue-router4.x 支持 typescript，配置路由的类型是 RouteRecordRaw，这里 meta 可以让我们有更多的发挥空间，这里提供一些参考：
// title:string; 页面标题，通常必选。
// icon?:string; 图标，一般配合菜单使用。
// auth?:boolean; 是否需要登录权限。
// ignoreAuth?:boolean; 是否忽略权限。
// roles?:RoleEnum[]; 可以访问的角色
// keepAlive?:boolean; 是否开启页面缓存
// hideMenu?:boolean; 有些路由我们并不想在菜单中显示，比如某些编辑页面。
// order?:number; 菜单排序。
// level: 层级
// affix: 是否固定在标签页上
// frameUrl?:string; 嵌套外链。

import routerComponentsNameMap from './routeConfig'

export const customRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      hideMenu: true
    },
    // 注意这里要带上 文件后缀.vue
    component: () => import('@/views/login-page/index.vue')
  },
  {
    path: '/',
    component: routerComponentsNameMap.layout,
    name: 'defaultHome',
    redirect: '/home',
    meta: {
      icon: 'adv-tabbar-home-filled',
      parentName: '',
      hideMenu: true
    },
    children: [
      {
        path: 'home',
        component: routerComponentsNameMap.home,
        name: 'home',
        meta: {
          title: '首页',
          affix: true,
          icon: 'adv-tabbar-home-filled',
          keepAlive: true,
          parentName: 'home'
        }
      }
    ]
  },
  {
    path: '/basic-grammar',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'basic',
    meta: {
      title: '基础语法',
      icon: 'adv-camera-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'composition-api',
        component: routerComponentsNameMap['composition-api'],
        name: 'compositionAPi',
        meta: {
          title: 'compositionAPi',
          keepAlive: true,
          icon: 'adv-tabbar-ana-filled',
          parentName: 'Charts'
        }
      }
    ]
  },
  {
    path: '/table',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'Table',
    meta: {
      title: '表格',
      icon: 'adv-table',
      parentName: '',
      keepAlive: true
    },
    children: [
      {
        path: 'edit-table',
        component: routerComponentsNameMap['edit-table'],
        name: 'EditTable',
        redirect: 'noRedirect',
        meta: {
          title: '可编辑表格',
          hideMenu: true,
          parentName: 'Table',
          keepAlive: true
        },
        children: [
          {
            path: 'edit',
            component: routerComponentsNameMap['edit-table-edit'],
            name: 'EditTable1',
            meta: {
              title: '可编辑表格',
              icon: 'adv-tabbar-map-filled',
              keepAlive: true,
              parentName: 'EditTable'
            }
          }
        ]
      },
      {
        path: 'drag-table',
        component: routerComponentsNameMap['drag-table'],
        name: 'DragTable',
        meta: {
          title: '可拖拽表格',
          icon: 'adv-tabbar-task-filled',
          keepAlive: true,
          parentName: 'Table'
        }
      }
    ]
  },
  {
    path: '/charts',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'Charts',
    meta: {
      title: '图表',
      icon: 'adv-tabbar-ana-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'line-page',
        component: routerComponentsNameMap['line-page'],
        name: 'linePage',
        meta: {
          title: '折线图',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      },
      {
        path: 'bar-page',
        component: routerComponentsNameMap['bar-page'],
        name: 'barPage',
        meta: {
          icon: 'adv-danger-filled',
          title: '柱状图',
          parentName: 'Charts'
        }
      },
      {
        path: 'scatter-page',
        component: routerComponentsNameMap['scatter-page'],
        name: 'scatterPage',
        meta: {
          icon: 'adv-danger-filled',
          title: '散点图',
          parentName: 'Charts'
        }
      },
      {
        path: 'custom-seies',
        component: routerComponentsNameMap['custom-demo'],
        name: 'customSeries',
        meta: {
          icon: 'adv-danger-filled',
          title: '自定义 series',
          parentName: 'Charts'
        }
      },
      {
        path: 'echarts-demo',
        component: routerComponentsNameMap['echarts-demo'],
        name: 'echartsDemo',
        meta: {
          icon: 'adv-danger-filled',
          title: '测试图表',
          parentName: 'Charts'
        }
      }
    ]
  },
  {
    path: '/a-map',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'gaodeMap',
    meta: {
      title: '高德地图',
      icon: 'adv-tabbar-ana-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'base-map',
        component: routerComponentsNameMap['base-map'],
        name: 'baseMap',
        meta: {
          title: '基础地图',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      },
      {
        path: 'misc-map',
        component: routerComponentsNameMap['misc-map'],
        name: 'miscMap',
        meta: {
          title: '自定义绘制内容',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      }
    ]
  },
  {
    path: '/three-page',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'threePage',
    meta: {
      title: '三维模型',
      icon: 'adv-tabbar-ana-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'threejs-model',
        component: routerComponentsNameMap['threejs-model'],
        name: 'threeModel',
        meta: {
          title: 'three模型',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      },
      {
        path: 'threejs-demo',
        component: routerComponentsNameMap['threejs-demo'],
        name: 'threejsDemo',
        meta: {
          title: 'three测试',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      }
    ]
  },
  {
    path: '/micro-services',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'Microservices',
    meta: {
      title: '微服务',
      icon: 'adv-tabbar-ana-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'vue-app/amap',
        component: routerComponentsNameMap['vue-app-amap'],
        name: 'vueApp',
        meta: {
          title: '微应用地图',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      },
      {
        path: 'vue-app/HomeView',
        component: routerComponentsNameMap['vue-app-homeView'],
        name: 'vueAppHome',
        meta: {
          title: '微应用首页',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      }
    ]
  },
  {
    path: '/antv6-page',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'antvx6',
    meta: {
      title: 'AntV｜X6',
      icon: 'adv-tabbar-ana-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'x6-demo',
        component: routerComponentsNameMap['x6-demo'],
        name: 'x6demo',
        meta: {
          title: 'AntV|X6 demo',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      },
      {
        path: 'x6-demo-1',
        component: routerComponentsNameMap['x6-demo-1'],
        name: 'x6demo-1',
        meta: {
          title: 'AntV|X6 demo-1',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      },
      {
        path: 'x6-demo-2',
        component: routerComponentsNameMap['x6-demo-2'],
        name: 'x6demo-2',
        meta: {
          title: 'AntV|X6 demo-2',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      },
      {
        path: 'x6-demo-3',
        component: routerComponentsNameMap['x6-demo-3'],
        name: 'x6demo-3',
        meta: {
          title: 'AntV|X6 demo-3',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      }
    ]
  },
  {
    path: '/antg2-page',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'antvg2',
    meta: {
      title: 'AntV｜G2',
      icon: 'adv-tabbar-ana-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'g2-demo',
        component: routerComponentsNameMap['g2-demo'],
        name: 'g2demo',
        meta: {
          title: 'AntV｜G2 demo',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      }
    ]
  },
  {
    path: '/ant-l7',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'antvl7',
    meta: {
      title: 'AntV｜L7',
      icon: 'adv-tabbar-ana-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'l7-demo',
        component: routerComponentsNameMap['l7-demo'],
        name: 'l7demo',
        meta: {
          title: 'AntV｜L7 demo',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      }
    ]
  },
  {
    path: '/d3-demo',
    component: routerComponentsNameMap.layout,
    redirect: 'noRedirect',
    name: 'd3demo',
    meta: {
      title: 'D3 demo',
      icon: 'adv-tabbar-ana-filled',
      keepAlive: true,
      parentName: ''
    },
    children: [
      {
        path: 'triangular-chart',
        component: routerComponentsNameMap['triangular-chart'],
        name: 'triangularChart',
        meta: {
          title: '三角坐标统计图',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      },
      {
        path: 'd3-demo-1',
        component: routerComponentsNameMap['d3-demo-1'],
        name: 'd3-demo-1',
        meta: {
          title: 'd3-demo-1',
          icon: 'adv-gear-filled',
          keepAlive: true,
          parentName: 'Charts'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: customRoutes
})
export default router
