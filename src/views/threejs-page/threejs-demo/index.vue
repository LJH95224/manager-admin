<!--
 * @Description: three 测试
 * @Autor: Alfred
 * @Date: 2022-06-13 09:56:31
 * @FilePath: \main-project\src\views\threejs-page\threejs-demo\index.vue
-->
<template>
  <div class="three-demo">
    <div @click="add">添加</div>
    <div ref="container" class="three"></div>
  </div>
</template>
<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const container = ref(null)
let camera = null
let renderer = null
let point = null
let mouse = null
let objDiv = null
const obj1Div = document.createElement('div')
obj1Div.style.position = 'absolute'
obj1Div.style.width = '200px'
obj1Div.style.height = '200px'
obj1Div.style.textAlign = 'center'
obj1Div.style.lineHeight = '200px'
obj1Div.style.border = '1px solid #fff'
obj1Div.style.zIndex = 999
obj1Div.style.color = '#fff'
obj1Div.innerHTML = '弹窗'
/**
 * 创建场景对象Scene
 */
const scene = new THREE.Scene()

/****** 网格模型 ******/
/**
 * @description: 创建立方体
 */
function createCube(X, Y, Z, color) {
  //创建一个立方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(100, 100, 100)
  //材质对象Material
  const material = new THREE.MeshLambertMaterial({
    color: color
  })
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: color,
    specular: 0x4488ee,
    shininess: 12
  })
  const mesh = new THREE.Mesh(geometry, sphereMaterial) //网格模型对象Mesh
  mesh.position.set(X, Y, Z)
  console.log(mesh)
  scene.add(mesh) //网格模型添加到场景中
  return mesh
}
/**
 * @description: 创建球体
 */
function createGlobe(X, Y, Z, color) {
  // 球体网格模型
  const geometry = new THREE.SphereGeometry(30, 20, 20)
  const material = new THREE.MeshLambertMaterial({
    color: color
  })
  const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
  mesh.position.set(X, Y, Z)
  scene.add(mesh) //网格模型添加到场景中
  return mesh
}

/**
 * @description: 创建圆柱体
 */
function createCylinder(X, Y, Z, color) {
  // 圆柱网格模型
  const geometry = new THREE.CylinderGeometry(50, 50, 100, 25)
  const material = new THREE.MeshLambertMaterial({
    color: color
  })
  const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
  mesh.position.set(X, Y, Z)
  scene.add(mesh) //网格模型添加到场景中
}
/**
 * @description: 创建辽宁舰模型
 */
function createGLTFLoader() {
  const gltfloader = new GLTFLoader()
  gltfloader.load('/public/threeModel/hangmu/hm.gltf', (gltf) => {
    scene.add(gltf.scene)
  })
}
/**
 * @description: 创建TV站模型
 */
function createFBXLoader(X, Y, Z) {
  const fbxloader = new FBXLoader()
  fbxloader.load('/public/threeModel/tvstand.FBX', (fbx) => {
    fbx.position.set(X, Y, Z)
    scene.add(fbx)
  })
}
/**
 * @description: 创建人物模型
 */
function createOBJLoader(X, Y, Z) {
  const objloader = new OBJLoader()
  objloader.load('/public/threeModel/模型2022.2.22/展示模型/桃然2022.2.22.obj', (obj) => {
    obj.position.set(X, Y, Z)
    scene.add(obj)
  })
}
/* 网格模型结束 */

/** 光源设置 */
/**
 * @description: 创建光源点
 */
function createPhotosource(X, Y, Z, color) {
  point = new THREE.PointLight(color)
  point.position.set(X, Y, Z) //点光源位置
  scene.add(point) //点光源添加到场景中
}

//环境光
function createAmbientLight(color) {
  const ambient = new THREE.AmbientLight(color)
  scene.add(ambient)
}
/* 光源设置结束 */

/* 设置相机 */
/**
 * @description:
 * @param {*} width //窗口宽度
 * @param {*} height //窗口高度
 * @param {*} s //三维场景显示范围控制系数，系数越大，显示的范围越大
 * @param {*} X
 * @param {*} Y
 * @param {*} Z
 * @return {*}
 */
function createCamera(width, height, s, X, Y, Z) {
  const k = width / height //窗口宽高比
  //创建相机对象
  camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 100000)
  camera.position.set(X, Y, Z) //设置相机位置
  camera.lookAt(scene.position) //设置相机方向(指向的场景对象)
}

// 设置旋转
function rotateY(mesh, mesh1) {
  let i = 400
  let j = -400
  let bool1 = true
  let bool2 = true
  setInterval(() => {
    if (i > 800) {
      bool1 = false
    }
    if (i < -800) {
      bool1 = true
    }
    if (j > 800) {
      bool2 = false
    }
    if (j < -800) {
      bool2 = true
    }
    if (bool1) {
      i += 10
    } else {
      i -= 10
    }
    if (bool2) {
      j += 10
    } else {
      j -= 10
    }
    point.position.set(i, 500, j)
    if (mesh1) {
      mesh1.position.set(i / 2, 500 / 2, j / 2)
    }
    if (mesh) {
      mesh.rotateY(i / 10000)
    }
    const width = container.value.clientWidth
    const height = container.value.clientHeight
    const halfWidth = width / 2
    const halfHeight = height / 2
    const vector1 = mesh1.position.clone().project(camera)
    obj1Div.style.left = vector1.x * halfWidth + halfWidth + 'px'
    obj1Div.style.top = -vector1.y * halfHeight + halfHeight + 'px'
    renderer.render(scene, camera) //执行渲染操作
  }, 30)
}

onMounted(() => {
  // const dirLight = new THREE.DirectionalLight(0xffffff)
  // dirLight.position.set(0, 1, 0)
  // scene.add(dirLight)

  // // grid
  const gridHelper = new THREE.GridHelper(400, 10, 0xffffff, 0xffffff)
  scene.add(gridHelper)
  /**
   * 创建网格模型
   */
  const mesh = createCube(0, 0, 0, 0xff55ff)
  const mesh1 = createGlobe(400, 500, -400, 0xffff55)
  createCylinder(0, 120, 0, 0x55ff55)
  // createFBXLoader(74.3, 0, -10)
  // createOBJLoader(0, 0, 0)
  scene.background = new THREE.Color('#333333')

  /**
   * 光源设置
   */
  createPhotosource(400, 500, -400, 0xffffff)
  createAmbientLight(0x444444)
  /**
   * 相机设置
   */
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  createCamera(width, height, 200, 200, 300, 200)
  /**
   * 创建渲染器对象
   */
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height) //设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
  container.value.appendChild(renderer.domElement) //body元素中插入canvas对象
  //执行渲染操作   指定场景、相机作为参数
  function render() {
    const halfWidth = width / 2
    const halfHeight = height / 2

    const vector1 = mesh1.position.clone().project(camera)
    obj1Div.style.left = vector1.x * halfWidth + halfWidth + 'px'
    obj1Div.style.top = -vector1.y * halfHeight + halfHeight + 'px'
    renderer.render(scene, camera) //执行渲染操作
  }
  container.value.appendChild(obj1Div)
  render()
  rotateY(mesh, mesh1)
  const controls = new OrbitControls(camera, renderer.domElement) //创建控件对象
  controls.addEventListener('change', render) //监听鼠标、键盘事件
  const onMousedown = (event) => {
    mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()

    mouse.x = ((event.clientX - container.value.offsetLeft) / width) * 2 - 1
    mouse.y = -((event.clientY - container.value.offsetTop) / height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (objDiv) {
      objDiv.remove()
    }
    objDiv = document.createElement('div')
    console.log(event)
    console.log(intersects)
    if (intersects.length > 0) {
      objDiv.style.position = 'absolute'
      objDiv.style.width = '100px'
      objDiv.style.height = '50px'
      objDiv.style.border = '1px'
      objDiv.style.top = event.layerY + 'px'
      objDiv.style.left = event.layerX + 'px'
      objDiv.style.zIndex = 999
      objDiv.style.color = '#fff'
      objDiv.innerHTML = intersects[0].object.uuid
      console.log(intersects[0].object.uuid)
      console.log(objDiv)
      container.value.appendChild(objDiv)
    }
  }
  container.value.addEventListener('contextmenu', onMousedown, false)
})

const add = () => {
  console.log(123)
  createCube(0, 0, 20, 0x55ffff)
  point.position.set(0, 900.264, 0)
  renderer.render(scene, camera)
}
</script>

<style scoped lang="scss">
.three-demo {
  width: 100%;
  height: 100%;
  .three {
    width: 100%;
    height: calc(100% - 160px);
    background: #799;
    position: relative;
  }
}
</style>
