/*
 * @Description: 路由信息
 * @Autor: Alfred
 * @Date: 2022-04-08 18:14:29
 * @FilePath: /v3Demo/src/store/route.ts
 */
import { defineStore } from 'pinia'
import { remove, cloneDeep } from 'lodash'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

export interface visitedViewsTypes extends Partial<RouteLocationNormalized> {
  title?: string
}

export const routeConfigStore = defineStore('routeConfig', {
  state: () => ({
    // 侧边栏状态
    isCollapse: false,
    // 请求到的路由数据
    queryedRouterData: [] as RouteRecordRaw[],
    // 路由扁平数据结构
    routerList: [] as RouteRecordRaw[],
    // 路由树
    routerTree: [],
    // 路由对应的信息
    routerMap: {},
    // 筛选之后的菜单数组
    menuTree: [] as any[],
    // 需要存储的keep-alive
    keepAliveMenu: [] as string[],
    // 显示在tag标签的内容
    visitedViews: [] as visitedViewsTypes[],
    cachedViews: [] as (string | undefined)[]
  }),
  actions: {
    // getRouterMenuData() {
    //   return new Promise((reslove, rejects) => {
    //     loginApi
    //       .getRouterMenuListData()
    //       .then((res) => {
    //         const menuBaseData: RouteRecordRaw[] = cloneDeep(res.data)
    //         this.menuTree = processingRoute(menuBaseData)
    //         console.log(this.menuTree)
    //         const routeBaseData: RouteRecordRaw[] = cloneDeep(res.data)
    //         console.log(routeBaseData)
    //         let routerList = dfsTreeData(routeBaseData)
    //         this.routerList = cloneDeep(routerList)

    //         routerList.forEach((item: routerParentName) => {
    //           if (item.parentName === '') {
    //             item.route.component = getProperty(componentsMap, item.route.component)
    //             router.addRoute(item.route)
    //           } else {
    //             console.log('parent', item.parentName)
    //             item.route.component = getProperty(componentsMap, item.route.component)
    //             router.addRoute(item.parentName, item.route)
    //           }
    //         })
    //         reslove(res)
    //       })
    //       .catch((err) => {
    //         rejects(err)
    //       })
    //   })
    // },
    setRouteMenuData(routeData: RouteRecordRaw[]) {
      this.queryedRouterData = cloneDeep(routeData)
      const menuBaseData: RouteRecordRaw[] = cloneDeep(routeData)
      this.menuTree = processingRoute(menuBaseData)

      const routeBaseData: RouteRecordRaw[] = cloneDeep(routeData)
      const routerList = dfsTreeData(routeBaseData)
      this.keepAliveMenu = []
      routerList.forEach((item) => {
        if (item.meta && item.meta.keepAlive) {
          this.keepAliveMenu.push(item.name)
        }
      })

      this.routerList = cloneDeep(routerList)
      console.log(routerList, this.keepAliveMenu)
      // console.log(this.menuTree, this.routerList)
    },
    resetRouter() {
      this.isCollapse = false
      // 路由扁平数据结构
      this.routerList = []
      // 路由树
      this.routerTree = []
      // 路由对应的信息
      this.routerMap = {}
      // 需要存储的keep-alive
      this.keepAliveMenu = []
      // 显示在tag标签的内容
      this.visitedViews = []
      this.cachedViews = []
    },
    addViews(view: visitedViewsTypes) {
      if (view.name === null) {
        return
      }
      if (!this.cachedViews.includes(view.name?.toString())) {
        if (view.meta?.keepAlive) {
          this.cachedViews.push(view.name?.toString())
        }
      }
      if (!this.visitedViews.some((v) => v.path === view.path)) {
        const obj = {}
        Object.assign(obj, view, {
          title: view.meta?.title || 'no-name'
        })
        this.visitedViews.push(obj)
      }
    },
    removeView(view: visitedViewsTypes) {
      const cachedViewsIndex = this.cachedViews.findIndex((v) => v === view.name?.toString())
      if (cachedViewsIndex >= 0) {
        this.cachedViews.splice(cachedViewsIndex, 1)
      }
      const visitedViewsIndex = this.visitedViews.findIndex((v) => v.path === view.path)
      if (visitedViewsIndex >= 0) {
        this.visitedViews.splice(visitedViewsIndex, 1)
      }
    }
  }
})

// 过滤树状结构，将数据添加到tree中
function processingRoute(nodeDataList: any[]) {
  const arr: any[] = []
  for (let i = 0; i < nodeDataList.length; i++) {
    if (nodeDataList[i].children && nodeDataList[i].children?.length > 0) {
      const node: any[] = nodeDataList[i].children
      const childArr = processingRoute(node)
      const tmpNode = cloneDeep(nodeDataList[i])
      if (tmpNode?.meta?.hideMenu) {
        childArr.map((item) => {
          if (tmpNode.path === '/') {
            item.path = '/' + item.path
          } else {
            item.path = tmpNode.path + '/' + item.path
          }
          return item
        })
        arr.push(...childArr)
      } else {
        Object.assign(tmpNode, { children: childArr })
        arr.push(tmpNode)
      }
    } else {
      const tmpNode = cloneDeep(nodeDataList[i])
      if (!tmpNode?.meta?.hideMenu) {
        Object.assign(tmpNode, { children: [] })
        arr.push(tmpNode)
      }
    }
  }
  return arr
}

function dfsTreeData(nodeDataList: any[], nodeList: any[] = []) {
  for (let i = 0; i < nodeDataList.length; i++) {
    const tmpNode = nodeDataList[i]
    const cloneNode = cloneDeep(tmpNode)
    cloneNode.children = []
    nodeList.push(cloneNode)
    // console.log(nodeList)
    if (tmpNode.children && tmpNode.children?.length > 0) {
      const node: any[] = tmpNode.children
      dfsTreeData(node, nodeList)
    }
  }
  return nodeList
}
