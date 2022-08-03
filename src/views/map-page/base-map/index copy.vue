<!--
 * @Description: 基础高德地图
 * @Autor: Alfred
 * @Date: 2022-05-20 16:52:14
 * @FilePath: /main-project/src/views/map-page/base-map/index copy.vue
-->
<template>
  <div id="container" class="map-box"></div>
</template>

<script setup>
import { shallowRef, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
let mymap = shallowRef(null)

const initMap = () => {
  AMapLoader.load({
    key: '4c3405d64b542d04758985ed9b93f5a8', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      window.AMap = AMap
      mymap = new AMap.Map('container', {
        //设置地图容器id
        viewMode: '3D', //是否为3D地图模式
        zoom: 5, //初始化地图级别
        center: [105.602725, 37.076636] //初始化地图中心点位置
      })
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e)
    })
}

onMounted(() => {
  initMap()
})
</script>

<style scoped lang="scss">
.map-box {
  width: 100%;
  height: 100%;
}
</style>
