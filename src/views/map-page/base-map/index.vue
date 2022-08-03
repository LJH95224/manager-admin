<!--
 * @Description: 基础高德地图
 * @Autor: Alfred
 * @Date: 2022-05-20 16:52:14
 * @FilePath: /main-project/src/views/map-page/base-map/index.vue
-->
<template>
  <div id="container" ref="container" class="map-box"></div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import * as THREE from 'three'

let mymap = null
let data
let customCoords

const initMap = () => {
  AMapLoader.load({
    key: '4c3405d64b542d04758985ed9b93f5a8', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      mymap = new AMap.Map('container', {
        center: [116.54, 39.79],
        zooms: [2, 20],
        zoom: 14,
        viewMode: '3D',
        pitch: 50
      })
      console.log(mymap)
      console.log(mymap)
      customCoords = mymap.customCoords
      // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
      data = customCoords.lngLatsToCoords([
        [116.52, 39.79],
        [116.54, 39.79],
        [116.56, 39.9]
      ])
      addCustomLayer()
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e)
    })
}

let camera
let renderer
let scene
const meshes = []

const addCustomLayer = function () {
  const gllayer = new AMap.GLCustomLayer({
    // 图层的层级
    zIndex: 10,
    // 初始化的操作，创建图层过程中执行一次。
    init: (gl) => {
      // 这里我们的地图模式是 3D，所以创建一个透视相机，相机的参数初始化可以随意设置，因为在 render 函数中，每一帧都需要同步相机参数，因此这里变得不那么重要。
      // 如果你需要 2D 地图（viewMode: '2D'），那么你需要创建一个正交相机
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1 << 30)

      renderer = new THREE.WebGLRenderer({
        context: gl // 地图的 gl 上下文
        // alpha: true,
        // antialias: true,
        // canvas: gl.canvas,
      })

      // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
      renderer.autoClear = false
      scene = new THREE.Scene()

      // 环境光照和平行光
      const aLight = new THREE.AmbientLight(0xffffff, 0.3)
      const dLight = new THREE.DirectionalLight(0xffffff, 1)
      dLight.position.set(1000, -100, 900)
      scene.add(dLight)
      scene.add(aLight)

      const texture = new THREE.TextureLoader().load(
        'https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg'
      )
      texture.minFilter = THREE.LinearFilter
      //  这里可以使用 three 的各种材质
      const mat = new THREE.MeshPhongMaterial({
        color: 0xfff0f0,
        depthTest: true,
        transparent: true,
        map: texture
      })
      const geo = new THREE.BoxBufferGeometry(1000, 1000, 1000)
      for (let i = 0; i < data.length; i++) {
        const d = data[i]
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(d[0], d[1], 500)
        meshes.push({
          mesh,
          count: i
        })
        scene.add(mesh)
      }
    },
    render: () => {
      // 这里必须执行！！重新设置 three 的 gl 上下文状态。
      renderer.state.reset()
      const { near, far, fov, up, lookAt, position } = customCoords.getCameraParams()

      // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
      camera.near = near
      camera.far = far
      camera.fov = fov
      camera.position.set(...position)
      camera.up.set(...up)
      camera.lookAt(...lookAt)
      camera.updateProjectionMatrix()

      renderer.render(scene, camera)
    }
  })
  // console.log('添加图曾')
  mymap.add(gllayer)
  animate()
}

const animate = () => {
  for (let i = 0; i < meshes.length; i++) {
    let { count } = meshes[i]
    const { mesh } = meshes[i]
    count += 1
    mesh.rotateZ((count / 180) * Math.PI)
  }
  // console.log('图层渲染 ')
  mymap.render()
  requestAnimationFrame(animate)
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  mymap.destroyed()
})
</script>

<style scoped lang="scss">
.map-box {
  width: 100%;
  height: 100%;
}
</style>
