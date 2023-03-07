import * as THREE from 'three'
import { renderer, labelRenderer, scene, camera, controls } from './scene.js'

import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { GUI } from 'dat.gui'
import $ from 'jquery'
import TWEEN from '@tweenjs/tween.js'
import { Plane } from 'three'

var chooseMesh,
  granaryArrclick = [],
  granaryArrdbclick = [],
  dbchooseMesh

var timeout = null //引入定时器
var chooseMesh = null

function choose(event) {
  //设置定时器
  timeout = setTimeout(function () {
    if (chooseMesh) {
      label.element.style.visibility = 'hidden'
    }

    var Sx = event.clientX //鼠标单击位置横坐标
    var Sy = event.clientY //鼠标单击位置纵坐标
    //屏幕坐标转WebGL标准设备坐标
    var x = (Sx / window.innerWidth) * 2 - 1 //WebGL标准设备横坐标
    var y = -(Sy / window.innerHeight) * 2 + 1 //WebGL标准设备纵坐标
    //创建一个射线投射器`Raycaster`
    var raycaster = new THREE.Raycaster()
    //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
    //返回.intersectObjects()参数中射线选中的网格模型对象
    // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素

    var intersects = raycaster.intersectObjects(granaryArrdbclick)

    //console.log("射线投射器返回的对象 点point", intersects[0].point);
    //   console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
    //   intersects.length大于0说明，说明选中了模型
    if (intersects.length > 0) {
      chooseMesh = intersects[0].object
      console.log('chooseMesh: ', chooseMesh)
      if (chooseMesh.name == 'left') {
        addlabel(chooseMesh, -1000, 3000)
      } else if (chooseMesh.name == 'right') {
        addlabel(chooseMesh, 1000, 1000)
      } else if (chooseMesh.name == 'RuNan') {
        addlabel(chooseMesh, 1000, 2800)
      } else if (chooseMesh.name == 'HaiAn') {
        addlabel(chooseMesh, -2000, 3000)
      } else if (chooseMesh.name == 'four-Room') {
        addlabel(chooseMesh, -1000, 1500)
      } else if (chooseMesh.name == 'four-Pao') {
        addlabel(chooseMesh, -200, 4200)
      } else if (chooseMesh.name == 'Ding') {
        addlabel(chooseMesh, 3500, 2500)
      } else if (chooseMesh.name == 'five-Lin') {
        addlabel(chooseMesh, 1300, 2000)
      } else if (chooseMesh.name == 'six-qiao') {
        addlabel(chooseMesh, -2000, 4500)
      } else if (chooseMesh.name == 'seven-pao') {
        addlabel(chooseMesh, 1500, 4000)
      }
    }
  }, 200)
}

addEventListener('click', choose) // 监听窗口鼠标单击事件

function dbchoose() {
  clearTimeout(timeout) //单击事件，清理定时器

  if (dbchooseMesh) {
    // camera.position.set(0, 0, 800)
    moveCaream(null, 0, 0, 27000)
  }
  var Sx = event.clientX //鼠标单击位置横坐标
  var Sy = event.clientY //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  var x = (Sx / window.innerWidth) * 2 - 1 //WebGL标准设备横坐标

  var y = -(Sy / window.innerHeight) * 2 + 1 //WebGL标准设备纵坐标
  //创建一个射线投射器`Raycaster`
  var raycaster = new THREE.Raycaster()
  //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
  //返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  var intersects = raycaster.intersectObjects(granaryArrclick)

  // console.log("射线投射器返回的对象 点point", intersects[0].point);
  // console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    dbchooseMesh = intersects[0].object
    console.log('dbchooseMesh: ', dbchooseMesh)

    moveCaream(dbchooseMesh.name, 0, 0, 15500)
  }
}
addEventListener('dblclick', dbchoose) // 监听窗口鼠标单击事件

function moveCaream(meshName, posx, posy, posz) {
  var FloorPosition
  if (meshName != null) {
    var havingmesh = scene.getObjectByName(meshName)

    FloorPosition = havingmesh.gethreerldPosition()
    var a = FloorPosition.x + posx,
      b = FloorPosition.y + posy,
      c = FloorPosition.z + posz
  } else {
    FloorPosition = { x: 0, y: 0, z: 0 }
  }
  var p1 = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  }
  // 相机目标位置点
  // const p2 = { x: -1000, y: 1020, z: 4060 }
  var p2
  if (meshName != null) {
    p2 = {
      x: a,
      y: b,
      z: c,
    }
  } else {
    p2 = {
      x: 0,
      y: 0,
      z: 27000,
    }
  }
  // 使用tween动画
  var tween = new TWEEN.Tween(p1)
    .to(p2, 6000)
    .easing(TWEEN.Easing.Quadratic.InOut)
  tween.onUpdate(() => {
    // 修改相机位置
    camera.position.set(p1.x, p1.y, p1.z)
    camera.lookAt(p1.x, p1.y, p1.z)
    controls.target.set(p1.x, p1.y, p1.z) // 确保镜头移动后，视觉中心还在圆点处
    controls.update()
  })
  // 开始动画
  tween.start()
}

function AddMeshIntoArr(meshname, model) {
  var granaryArr
  var device = scene.getObjectByName(meshname)
  if (model == 'click') {
    granaryArr = granaryArrclick
  } else {
    granaryArr = granaryArrdbclick
  }

  device.traverse(function (obj) {
    if (obj.isMesh) {
      obj.material.opacity = 0
      obj.material.transparent = true

      granaryArr.push(obj)
    }
  })
}

function addlabel(path, x, y) {
  $('#img').attr('src', `../img/one/` + path.name + `.png`)
  var position = path.gethreerldPosition()

  label.position.set((position.x += x), (position.y += y), position.z)
  label.element.style.visibility = 'visible'
}

var tag = document.getElementById('label')
var label = new CSS3DObject(tag)
scene.add(label)
label.scale.set(4, 4, 4)
var giftag = document.getElementById('one-GIF')
var giftaglabel = new CSS3DObject(giftag)
giftaglabel.scale.set(5.25, 5.25, 5.25)
giftaglabel.position.set(-1956, -7132, 1)
scene.add(giftaglabel)

var two_GIF = document.getElementById('two-GIF')
var two_GIFlabel = new CSS3DObject(two_GIF)
two_GIFlabel.scale.set(4.7, 4.7, 4.7)
two_GIFlabel.position.set(854, -984, 1)
scene.add(two_GIFlabel)

var three_GIF = document.getElementById('three-GIF')
var three_GIFlabel = new CSS3DObject(three_GIF)
three_GIFlabel.scale.set(4.9, 4.9, 4.9)
three_GIFlabel.position.set(7464, 3460, 1)
scene.add(three_GIFlabel)

var four_GIF = document.getElementById('four-GIF')
var four_GIFlabel = new CSS3DObject(four_GIF)
four_GIFlabel.scale.set(4.55, 4.55, 4.55)
four_GIFlabel.position.set(11932, 128, 1)
scene.add(four_GIFlabel)

var five_GIF = document.getElementById('five-GIF')
var five_GIFlabel = new CSS3DObject(five_GIF)
five_GIFlabel.scale.set(5, 5, 5)
five_GIFlabel.position.set(11128, -4658, 1)
scene.add(five_GIFlabel)

var six_GIF = document.getElementById('six-GIF')
var six_GIFlabel = new CSS3DObject(six_GIF)
six_GIFlabel.scale.set(5.2, 5.2, 5.2)
six_GIFlabel.position.set(-12160, 170, 1)
scene.add(six_GIFlabel)

var seven_GIF = document.getElementById('seven-GIF')
var seven_GIFlabel = new CSS3DObject(seven_GIF)
seven_GIFlabel.scale.set(5.55, 5.55, 5.55)
seven_GIFlabel.position.set(-4208, 3886, 1)
scene.add(seven_GIFlabel)

// var mesh = Plane

// const gui = new GUI()
// const params = {
//   scale: 2,
//   x: mesh.position.x,
//   y: mesh.position.y,
// }

// gui
//   .add(params, 'scale')
//   .min(0.1)
//   .max(10)
//   .step(0.05)
//   .onChange((d) => mesh.scale.set(d, d, d))

// var ax, ay
// gui
//   .add(params, 'x')
//   .min(-20000)
//   .max(20000)
//   .step(2)
//   .onChange((d) => (ax = d))

// gui
//   .add(params, 'y')
//   .min(-10000)
//   .max(10000)
//   .step(2)
//   .onChange((d) => (ay = d))

function animate(time) {
  // mesh.position.x = ax
  // mesh.position.y = ay

  TWEEN.update()
  // stats.update(); // 初始化stats后，需要在这里执行update方法才能实现fps实时监控
  renderer.render(scene, camera) // 最后需要将场景渲染出来，没有这句将什么都显示不了
  labelRenderer.render(scene, camera)
  requestAnimationFrame(animate) // 这里利用浏览器API——requestAnimationFrame，每帧都进行渲染，执行renderer.render(...)方法
}

// window.onload = function () {

// }

$('body').click(function () {
  //任何需要执行的js特效
  var audio = document.getElementById('music')
  audio.loop = true
  audio.muted = false
  audio.play()
})
// addEventListener('mousemove', function () {
//   // this.alert('v b')
//   var audio = document.getElementById('music')
//   audio.loop = true
//   audio.muted = false
//   audio.play()
// })
export { AddMeshIntoArr, animate }
