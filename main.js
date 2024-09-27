import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/addons/objects/Sky.js'
import {Timer} from 'three/addons/misc/Timer.js'
import GUI from "lil-gui";


// Debug UI
// const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()

// Floor Textures
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/rocky_terrain_1k/rocky_terrain_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/rocky_terrain_1k/rocky_terrain_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/rocky_terrain_1k/rocky_terrain_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/rocky_terrain_1k/rocky_terrain_disp_1k.jpg')

floorColorTexture.repeat.set(8,8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorColorTexture.colorSpace = THREE.SRGBColorSpace

// Wall Textures
const wallColorTexture = textureLoader.load('./wall/castle_brick_01_1k/castle_brick_01_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/castle_brick_01_1k/castle_brick_01_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_01_1k/castle_brick_01_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof Textures
const roofColorTexture = textureLoader.load('./roof/clay_roof_tiles_03_1k/clay_roof_tiles_03_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/clay_roof_tiles_03_1k/clay_roof_tiles_03_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/clay_roof_tiles_03_1k/clay_roof_tiles_03_nor_gl_1k.jpg')

roofColorTexture.repeat.set(7,1)
roofARMTexture.repeat.set(7,1)
roofNormalTexture.repeat.set(7,1)
roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.colorSpace = THREE.SRGBColorSpace

// Bush Textures
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')

bushColorTexture.repeat.set(2,1)
bushARMTexture.repeat.set(2,1)
bushNormalTexture.repeat.set(2,1)
bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping
bushColorTexture.colorSpace = THREE.SRGBColorSpace

// Grave Textures
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.repeat.set(0.3,1)
graveARMTexture.repeat.set(0.3,1)
graveNormalTexture.repeat.set(0.3,1)
graveColorTexture.wrapS = THREE.RepeatWrapping
graveARMTexture.wrapS = THREE.RepeatWrapping
graveNormalTexture.wrapS = THREE.RepeatWrapping
graveColorTexture.colorSpace = THREE.SRGBColorSpace

// Door Textures
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Meshes

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: - 0.179
  })
)
floor.rotation.x = - (Math.PI / 2)
scene.add(floor)

// debug
// gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
// gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

// Group (house)
const house = new THREE.Group()
scene.add(house)

// Wall
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4,2.5,4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture
  })
)
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5,1.5,4, 10),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI /4
house.add(roof)

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
  })
)
door.position.y = 1.1
door.position.z = 2.001
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
  color: '#ccffcc'
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8, 0.2, 2.15)
bush1.rotation.x = - 0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4, 0.1, 2.15)
bush2.rotation.x = - 0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8, 0.1, 2.15)
bush3.rotation.x = - 0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1.2, 0.05, 2.35)
bush4.rotation.x = - 0.75

house.add(bush1, bush2, bush3, bush4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture
})

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2
  const radius = 4 + Math.random() * 3
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

// Lighting

// Ambient Light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3,2, -8)
scene.add(directionalLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46')
doorLight.position.set(0,2.2,2.5)
house.add(doorLight)

// Ghost Lights
const ghost1 = new THREE.PointLight('#232424', 6)
const ghost2 = new THREE.PointLight('#232424', 6)
const ghost3 = new THREE.PointLight('#232424', 6)
scene.add(ghost1, ghost2, ghost3)

// Camera
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
camera.position.z = 9
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children) {
  grave.castShadow = true
  grave.receiveShadow = true
}

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

// Sky
const sky = new Sky()
sky.scale.set(100,100,100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

// Fog
scene.fog = new THREE.FogExp2('#02343f', 0.1)

// Animation/orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const timer = new Timer()

const animate = () => {
  controls.update()

  timer.update()
  const elapsedTime = timer.getElapsed()

  // ghost animation
  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

  const ghost2Angle = - (elapsedTime * 0.38)
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

  const ghost3Angle = elapsedTime * 0.23
  ghost3.position.x = Math.cos(ghost3Angle) * 6
  ghost3.position.z = Math.sin(ghost3Angle) * 6
  ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)


  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()