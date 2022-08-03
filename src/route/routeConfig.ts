/*
 * @Description:
 * @Autor: Alfred
 * @Date: 2022-04-11 17:47:56
 * @FilePath: /main-project/src/route/routeConfig.ts
 */
const routerComponentsNameMap = {
  layout: () => import('@/layout/index.vue'),
  home: () => import('@/views/dash-board/index.vue'),
  'edit-table': () => import('@/views/table-page/edit-table/index.vue'),
  'edit-table-edit': () => import('@/views/table-page/edit-table/edit-table1/index.vue'),
  'drag-table': () => import('@/views/table-page/drag-table/index.vue'),
  'line-page': () => import('@/views/echarts-page/line-page/index.vue'),
  'bar-page': () => import('@/views/echarts-page/bar-page/index.vue'),
  'custom-demo': () => import('@/views/echarts-page/custom-demo/index.vue'),
  'scatter-page': () => import('@/views/echarts-page/scatter-page/index.vue'),
  'composition-api': () => import('@/views/basic-grammar/composition-api/index.vue'),
  'base-map': () => import('@/views/map-page/base-map/index.vue'),
  'misc-map': () => import('@/views/map-page/misc-map/index.vue'),
  'threejs-model': () => import('@/views/threejs-page/threejs-model/index.vue'),
  'vue-app-amap': () => import('@/views/micro-services/vue-app/amap.vue'),
  'vue-app-homeView': () => import('@/views/micro-services/vue-app/home.vue'),
  'x6-demo': () => import('@/views/antv-page/x6-demo/index.vue'),
  'x6-demo-1': () => import('@/views/antv-page/x6-demo-1/index.vue'),
  'x6-demo-2': () => import('@/views/antv-page/x6-demo-2/index.vue'),
  'x6-demo-3': () => import('@/views/antv-page/x6-demo-3/index.vue'),
  'echarts-demo': () => import('@/views/echarts-page/echarts-demo/index.vue'),
  'threejs-demo': () => import('@/views/threejs-page/threejs-demo/index.vue'),
  'g2-demo': () => import('@/views/antv-G2/G2-demo/index.vue'),
  'l7-demo': () => import('@/views/antv-L7/L7-demo/index.vue'),
  'triangular-chart': () => import('@/views/d3-demo/triangular-chart/index.vue'),
  'd3-demo-1': () => import('@/views/d3-demo/d3-demo-1/index.vue')
}

export default routerComponentsNameMap
