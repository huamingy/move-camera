import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(1000)
scene.add(axesHelper)
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
)
// camera.position.set(-20, 40, 30000) // 设置相机的初始位置
camera.position.set(0, 0, 27000) // 设置相机的初始位置

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  logarithmicDepthBuffer: true,
}) // alpha：背景透明，antialias：抗锯齿
renderer.outputEncoding = THREE.sRGBEncoding

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement) // 加入body中，也可以加入任意元素里

var labelRenderer = new CSS3DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'auto'
document.body.appendChild(labelRenderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff) // 自然光，每个几何体的每个面都有光
const pointLight = new THREE.PointLight(0xffffff, 1) // 点光源
pointLight.position.set(0, 100, 0) // 调整点光源位置
scene.add(ambientLight)
scene.add(pointLight)

// controls.addEventListener('change', function () {}) // 添加事件
var controls = new OrbitControls(camera, renderer.domElement)
// 上下旋转范围
// controls.minPolarAngle = 0
// controls.maxPolarAngle = Math.PI/2;
// controls.maxPolarAngle = Math.PI / 2
// // 启用或禁用摄像机平移
// controls.enablePan = false

// // 启用或禁用摄像机水平或垂直旋转
// controls.enableRotate = false

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

export { renderer, labelRenderer, scene, camera, controls }
