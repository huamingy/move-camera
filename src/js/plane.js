import * as THREE from 'three'
import { scene } from './scene.js'
import TWEEN from '@tweenjs/tween.js'
var yunGroup = new THREE.Group()
var TextureLoader = new THREE.TextureLoader()

var a = [576, 462, 505, 795, 527, 623, 754, 451, 586, 594],
  b = [201, 233, 233, 238, 232, 223, 274, 189, 250, 225]

for (var i = 1; i <= 10; i++) {
  const planegeometry = new THREE.PlaneBufferGeometry(
    a[i - 1] * 10,
    b[i - 1] * 10
  )
  var map = TextureLoader.load('../img/YUNpng/' + i + '.png')

  const sphereMaterial = new THREE.MeshStandardMaterial({
    map: map,
    transparent: true,
    side: THREE.DoubleSide,
  })

  const plane = new THREE.Mesh(planegeometry, sphereMaterial)
  plane.name = 'yun' + i
  // plane.rotateZ(Math.PI)
  // plane.rotateY(Math.PI)

  yunGroup.add(plane)
}

scene.add(yunGroup)

scene.getObjectByName('yun1').position.set(-13420, 8090, 200)
scene.getObjectByName('yun1').scale.set(2.0, 2.0, 2.0)

scene.getObjectByName('yun2').position.set(12414, 8938, 200)
scene.getObjectByName('yun2').scale.set(2, 2, 2)

scene.getObjectByName('yun3').position.set(-12823, 6159, 200)
scene.getObjectByName('yun3').scale.set(2.05, 2.05, 2.05)
scene.getObjectByName('yun4').position.set(11306, 5612, 200)
scene.getObjectByName('yun4').scale.set(2.0, 2.0, 2.0)

scene.getObjectByName('yun5').position.set(-13448, 824, 200)
scene.getObjectByName('yun5').scale.set(2.0, 2.0, 2.0)

scene.getObjectByName('yun6').position.set(5922, 2474, 200)
scene.getObjectByName('yun6').scale.set(2.0, 2.0, 2.0)

scene.getObjectByName('yun7').position.set(-11688, -4142, 200)
scene.getObjectByName('yun7').scale.set(2, 2, 2)

scene.getObjectByName('yun8').position.set(7796, -1750, 200)
scene.getObjectByName('yun8').scale.set(2, 2, 2)

scene.getObjectByName('yun9').position.set(-16954, -8624, 200)
scene.getObjectByName('yun9').scale.set(2, 2, 2)

scene.getObjectByName('yun10').position.set(14854, -9102, 200)
scene.getObjectByName('yun10').scale.set(2, 2, 2)

yunGroup.traverse(function (mesh) {
  var speedTime = Math.random() + 1

  var pos = mesh.getWorldPosition()
  var tweenA = new TWEEN.Tween(pos)
  tweenA.to(
    {
      x: pos.x + 600,
    },
    speedTime * 5000
  )
  tweenA.onUpdate(function () {
    mesh.position.x = pos.x
  })
  tweenA.start()

  var tweenB = new TWEEN.Tween(pos)
  tweenB.to(
    {
      x: pos.x - 600,
    },
    speedTime * 5000
  )
  tweenB.onUpdate(function () {
    mesh.position.x = pos.x
  })

  var tweenc = new TWEEN.Tween(pos)
  tweenc.to(
    {
      x: pos.x,
    },
    speedTime * 5000
  )
  tweenc.onUpdate(function () {
    mesh.position.x = pos.x
  })
  tweenA.chain(tweenB)
  tweenB.chain(tweenc)

  tweenc.chain(tweenA)
})

export { yunGroup }
// export { yunGroup, gui, params, mesh }
