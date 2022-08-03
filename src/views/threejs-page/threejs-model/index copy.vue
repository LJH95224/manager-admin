<!--
 * @Description: three 三维模型加载
 * @Autor: Alfred
 * @Date: 2022-05-23 09:53:29
 * @FilePath: /v3Demo/src/pages/threejs-page/threejs-model/index.vue
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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ref, onMounted } from 'vue'
const container = ref(null)

let renderer = null
let scene = null
let camera = null
let controls = null
let mouse = null
let targets = null

const targetsReg = [
  {
    reg: /^AM84_018_00|^AM84_018_034/,
    name: 'Ka-27型“螺旋”反潜直升机'
  },
  {
    reg: /^Tactical_Fighter/,
    name: 'F-15E型“攻击鹰”战斗机'
  }
]

const initThree = () => {
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  scene.background = new THREE.Color('#1F3439')
  scene.add(new THREE.GridHelper(100, 10))

  container.value.addEventListener('mousedown', onMousedown, false)

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

  const gltfloader = new GLTFLoader()
  gltfloader.load('/public/threeModel/hangmu/hm.gltf', function (gltf) {
    gltf.scene.scale.set(2, 2, 2)
    // console.log(gltf.scene.children)
    const reg = new RegExp(
      targetsReg.reduce((prev, curr) => `${prev}${prev ? '|' : ''}${curr.reg.source}`, '')
    )
    console.log(reg)
    targets = gltf.scene.children.filter((d) => reg.test(d.name))
    console.log(targets)
    scene.add(gltf.scene)
  })
}

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

// 这个类用于进行raycasting（光线投射）。 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
const onMousedown = (event) => {
  mouse = new THREE.Vector2()
  // console.log('鼠标按下', event)
  const raycaster = new THREE.Raycaster()
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

  // console.log(event.clientX, event.clientY, container.value.offsetLeft, container.value.offsetTop)

  mouse.x = ((event.clientX - container.value.offsetLeft) / container.value.clientWidth) * 2 - 1
  mouse.y = -((event.clientY - container.value.offsetTop) / container.value.clientHeight) * 2 + 1

  console.log(mouse.x, mouse.y)

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(targets)
  console.log(intersects)
  if (intersects.length > 0) {
    const selectedTarget = intersects[0].object
    const material = selectedTarget.material
    selectedTarget.material = material.clone()
    selectedTarget.material.color.set('red')
    const targetName = targetsReg.filter((d) => d.reg.test(selectedTarget.name)).shift()
    console.log(targetName)
  }
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
