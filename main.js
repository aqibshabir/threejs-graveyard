import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {Timer} from 'three/addons/misc/Timer.js'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//objects
//floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial()
)
floor.rotation.x = - (Math.PI / 2)
scene.add(floor)

//house
const house = new THREE.Group()
scene.add(house)
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4,2.5,5),
  new THREE.MeshStandardMaterial()
)
walls.position.y = 2.25 / 2
house.add(walls)
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5,1.5,4),
  new THREE.MeshStandardMaterial()
)
roof.position.y = 2.5 + 0.625
roof.rotation.y = Math.PI / 4
house.add(roof)

//lighting
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3,2, -8)
scene.add(directionalLight)

//camera
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}

window.addEventListener('resize', () => {
  //update size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  //update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 10
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// animation/orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const timer = new Timer()

const animate = () => {
  controls.update()

  timer.update()
  const elapsedTime = timer.getElapsed()


  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()