import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//object
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({roughness: 0.7})
)
scene.add(sphere)

//lighting
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight('#ffffff', 0.5)
directionalLight.position.x = 10
scene.add(directionalLight)

//camera
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)

// animation/orbit controls
const controls = new OrbitControls(camera, canvas)
const clock = new THREE.Clock()

const animate = () => {
  controls.enableDamping = true
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()