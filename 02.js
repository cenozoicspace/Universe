import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js";

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enable = true;
document.body.style.margin = 0;
document.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

//camera
const camera = new THREE.PerspectiveCamera(
  75, // Filled view
  window.innerWidth / window.innerHeight, //Ratio Layar
  0.1, // dekat
  100 // Jauh
);
camera.position.set(3, 2, 5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Objek
const geoSphere = new THREE.SphereGeometry(1, 64, 64);
const matSphere = new THREE.MeshStandardMaterial({
  color: 0x00aaff,
  metalness: 0.2,
  roughness: 0.4,
});
const sphere = new THREE.Mesh(geoSphere, matSphere);
sphere.castShadow = true;
sphere.position.y = 1;
sphere.add(sphere);

// Pencahayaan
const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;
scene.add(dirLight);

// Layer
const planeGeo = new THREE.planeGeoMETRY(10, 10);
const planeMat = new THREE.MeshStandardMaterial({
  color: 0x333333,
  roughness: 0.8,
});
const floor = new THREE.Mesh(planeGeo, planeMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveSHadow = true;
scene.add(floor);

// Animasi
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y = +0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsif
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer, setSize(window.innerWidth, window.innerHeight);
});
