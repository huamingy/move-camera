import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GUI } from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { scene } from './scene.js'
// import { yunGroup, gui, params, mesh} from './plane.js'
import { yunGroup } from './plane.js'

import { AddMeshIntoArr, animate } from './fun.js'

var Textureloader = new THREE.TextureLoader()
var map = Textureloader.load('../img/page.jpg')

const fbxLoader = new FBXLoader()

// fbxLoader.load('../model/DuoMeiTi.fbx', function (obj) {
//   console.log('objnnhn: ', obj)
//   // obj.scale.set(100, 100, 100)
//   obj.rotateX(Math.PI / 2)
//   obj.rotateY(Math.PI / 2)

//   obj.position.set(0, 0, 0)
//   scene.add(obj)
// })

const GltfLoader = new GLTFLoader()

GltfLoader.load('../model/DuoMeiTi.glb', function (obj) {
  console.log('objnnhn: ', obj.scene)
  obj.scene.scale.set(10000, 10000, 10000)
  obj.scene.rotateX(Math.PI / 2)
  // obj.scene.rotateY(Math.PI)

  obj.scene.position.set(0, 0, 0)
  scene.add(obj.scene)
  // scene.getObjectByName('five-Lin').position.set(0, 0, 200)
  AddMeshIntoArr('battle', 'click')
  AddMeshIntoArr('db', 'db')
})

animate()
