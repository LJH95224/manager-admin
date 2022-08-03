<!--
 * @Description: three 三维模型加载
 * @Autor: Alfred
 * @Date: 2022-05-23 09:53:29
 * @FilePath: /main-project/src/views/threejs-page/threejs-model/index.vue
-->
<template>
  <div class="three-demo">
    <div ref="container" class="container"></div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
// import { OrbitControls } from '/node_modules/three/examples/controls/OrbitControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { ref, onMounted } from 'vue'
const container = ref(null)

let renderer = null
let scene = null
let camera = null
let controls = null

const initThree = () => {
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#1F3439')
  scene.add(new THREE.GridHelper(100, 10))

  camera = new THREE.PerspectiveCamera(
    45,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    10000
  )
  camera.position.set(100, 200, 300)

  // 轨道控制
  controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 10
  controls.maxDistance = 20000

  const light = new THREE.DirectionalLight(0xffffff, 5)
  light.position.set(200, 450, 500)
  scene.add(light)

  const fbxloader = new FBXLoader()
  fbxloader.load('/public/threeModel/tvstand/tvstand.FBX', function (fbx) {
    // fbx.scene.scale.set(2, 2, 2)
    // fbx.scale.set(5, 5, 5)
    fbx.position.set(70, 5, 0)
    scene.add(fbx)
  })
}

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  initThree()
  animate()
})
</script>

<style scoped lang="scss">
.three-demo {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
  }
}
</style>
