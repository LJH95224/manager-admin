<!--
 * @Description: L7 demo
 * @Autor: Alfred
 * @Date: 2022-06-15 10:14:15
 * @FilePath: /main-project/src/views/antv-L7/L7-demo/index.vue
-->
<template>
  <div id="container" class="map-box"></div>
</template>

<script setup>
/**
 * @description: 此图层不能两个叠加
 * @return {*}
 */
import { Scene, CityBuildingLayer, LineLayer, PolygonLayer } from '@antv/l7'
import { GaodeMapV2 } from '@antv/l7-maps'
import AMapLoader from '@amap/amap-jsapi-loader'
import * as THREE from 'three'
let mapScene = null
const mymap = shallowRef(null)
let coordData
let customCoords

const initMap = () => {
  AMapLoader.load({
    key: '4c3405d64b542d04758985ed9b93f5a8', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0',
    // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    AMapUI: {
      version: '1.1',
      plugins: []
    },
    plugins: [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then(() => {
    mymap.value = new AMap.Map('container', {
      mapStyle: 'amap://styles/dark',
      center: [116.54, 39.79],
      zooms: [2, 20],
      zoom: 14,
      viewMode: '3D',
      pitch: 60
    })
    mapScene = new Scene({
      id: 'container',
      map: new GaodeMapV2({
        mapInstance: mymap.value
      })
    })

    customCoords = mymap.value.customCoords
    // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
    coordData = customCoords.lngLatsToCoords([
      [116.52, 39.79],
      [116.54, 39.79],
      [116.56, 39.9]
    ])
    console.log('coordData', coordData)
    addCustomLayer()
    mapScene.on('loaded', () => {
      console.log('完成scene初始化')
      setTimeout(() => {
        addLayers()
      }, 5000)
    })
    // addPointSimplifier()
    // 创建两个点标记
    const m1 = new AMap.Marker({
      position: [116.49, 39.9]
    })
    const m2 = new AMap.Marker({
      position: [116.29, 39.9]
    })
    const m3 = new AMap.Marker({
      position: [116.69, 39.9],
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
    })
    mymap.value.add(m1)
    mymap.value.add(m2)
    mymap.value.add(m3)
  })
}
const addLayers = () => {
  fetch('https://gw.alipayobjects.com/os/rmsportal/ggFwDClGjjvpSMBIrcEx.json').then(async (res) => {
    const pointLayer = new CityBuildingLayer()
    pointLayer
      .source(await res.json())
      .size('floor', [0, 500])
      .color('rgba(242,246,250,1.0)')
      .animate({
        enable: true
      })
      .active({
        color: '#0ff',
        mix: 0.5
      })
      .style({
        opacity: 0.7,
        baseColor: 'rgb(16, 16, 16)',
        windowColor: 'rgb(30, 60, 89)',
        brightColor: 'rgb(255, 176, 38)',
        sweep: {
          enable: true,
          sweepRadius: 2,
          sweepColor: '#1990FF',
          sweepSpeed: 0.5,
          sweepCenter: [120.145319, 30.238915]
        }
      })
    mapScene.addLayer(pointLayer)
  })

  fetch('https://gw.alipayobjects.com/os/bmw-prod/67130c6c-7f49-4680-915c-54e69730861d.json')
    .then((data) => data.json())
    .then(({ lakeBorderData, lakeData, landData }) => {
      const lakeLayer = new PolygonLayer()
        .source(lakeData)
        .shape('fill')
        .color('#1E90FF')
        .style({
          opacity: 0.4,
          opacityLinear: {
            enable: true,
            dir: 'out' // in - out
          }
        })
      const landLayer = new PolygonLayer()
        .source(landData)
        .shape('fill')
        .color('#3CB371')
        .style({
          opacity: 0.4,
          opacityLinear: {
            enable: true,
            dir: 'in' // in - out
          }
        })

      const lakeBorderLayer = new PolygonLayer()
        .source(lakeBorderData)
        .shape('fill')
        .color('#ccc')
        .style({
          opacity: 0.5,
          opacityLinear: {
            enable: true,
            dir: 'in' // in - out
          }
        })

      mapScene.addLayer(lakeLayer)
      mapScene.addLayer(lakeBorderLayer)
      mapScene.addLayer(landLayer)
    })

  fetch('https://gw.alipayobjects.com/os/basement_prod/40ef2173-df66-4154-a8c0-785e93a5f18e.json')
    .then((res) => res.json())
    .then((data) => {
      const layer = new LineLayer({
        zIndex: 0,
        depth: true
      })
        .source(data)
        .size(1)
        .shape('line')
        .color('#1990FF')
        .animate({
          interval: 1, // 间隔
          duration: 2, // 持续时间，延时
          trailLength: 2 // 流线长度
        })
      mapScene.addLayer(layer)
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
      for (let i = 0; i < coordData.length; i++) {
        const d = coordData[i]
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
  mymap.value.add(gllayer)
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
  mymap.value.render()
  requestAnimationFrame(animate)
}

onMounted(() => {
  initMap()
})
</script>

<style scoped lang="scss">
.map-box {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
