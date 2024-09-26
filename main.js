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

// group (house)
const house = new THREE.Group()
scene.add(house)

//wall
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4,2.5,5),
  new THREE.MeshStandardMaterial()
)
walls.position.y = 1.25
house.add(walls)

//roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.75,1.5,4),
  new THREE.MeshStandardMaterial()
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI / 4
house.add(roof)

//door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial()
)
door.position.y = 1
door.position.z = 2.501
house.add(door)

//bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8, 0.2, 2.5)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4, 0.1, 2.5)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8, 0.1, 2.5)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1, 0.05, 2.9)

house.add(bush1, bush2, bush3, bush4)

//graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2
  const radius = 4 + Math.random() * 4
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius
  
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  grave.position.x = x
  grave.position.z = z
  grave.position.y = Math.random() * 0.4
  grave.rotation.x = (Math.random() - 0.5) * 0.4 
  grave.rotation.y = (Math.random() - 0.5) * 0.4 
  grave.rotation.z = (Math.random() - 0.5) * 0.4 
  graves.add(grave)
}

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