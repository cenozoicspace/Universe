import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";

// renderer (alat untuk menggambar)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio); //tambahan : agar tampilan lebih tajan dilayar HD
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = 0; // hilangkan margin pada browser
document.body.appendChild(renderer.domElement);

// scene (Dunia 3D)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// camera (mata kita)
const camera = new THREE.PerspectiveCamera(
  75, // Filed view
  window.innerWidth / window.innerHeight, //Rasio layar
  0.1, // dekat
  1000 // jauh
);
camera.position.z = 3;

// Object (Kubus)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff88,
  roughness: 0.4,
  metalness: 0.1,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(2, 2, 5);
scene.add(directionalLight);

// Animasi
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// Responsif
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
