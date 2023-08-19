import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";

// Debug
const gui = new dat.GUI();
// show gui
gui.hide();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry();

// Materials

const material = new THREE.MeshBasicMaterial();
material.transparent = true;
//material.color = new THREE.Color(0xffff00);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.9);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 4;
camera.position.z = 2;
scene.add(camera);
// dat gui camera



const loader = new GLTFLoader();

// Load the glTF model
loader.load(
  "/iphone_14_pro/iphone_14_pro.glb",
  (glb) => {
    const model = glb.scene;
    // model.scale.set(40, 40, 40);
    scene.add(model);
    model.position.y = -1.5;
    model.position.x = 0;
    model.position.z = 0;
    // model.scale.set(0.3, 0.3, 0.3);
    model.rotation.y = 3.2;
    // model.rotation.x = 5;
    // model.rotation.z =0;

    // light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);



    const tl = gsap.timeline();
    tl.to(model.position, { duration: 1, x:4,y: -14,z:-10, ease: "power2.out" })
      .to(model.scale, { duration: 1, x: 1, y: 1, z: 1, ease: "power2.out" }, "+=5")
      .to(model.rotation, { duration: 1, y: 0, ease: "power2.out" }, "-=1")
      .call(() => {
        // Animation complete
        console.log("Animation finished");
      });

    // Add the loaded model to the scene
  },
  undefined,
  (error) => {
    console.error(error);
  }
);
// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.x = 0.5 * elapsedTime;
  sphere.rotation.z = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
