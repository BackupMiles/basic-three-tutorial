// Scene -> Meshes, Lights
// Camera, Renderer

import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshPhongMaterial, Mesh, PlaneGeometry, PointLight } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

const main = () => {
  const canvasEl = document.querySelector<HTMLCanvasElement>('canvas#three-canvas');
  if(!canvasEl) return; 
  
  const FOV = 65; // 50 and 70
  const ASPECT = 2;

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, ASPECT);
  const renderer = new WebGLRenderer({
    alpha: true, // transparent bg
    antialias: true,
    canvas: canvasEl
  });

  camera.position.set(0, 5, -20);
  camera.lookAt(0, 0, 0);

  const sphereGeometry = new SphereGeometry(2);
  const sphereMaterial = new MeshPhongMaterial({ color: 'blue' });
  const sphereMesh = new Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphereMesh);

  const floorSize = 40;
  const floorGeometry = new PlaneGeometry(floorSize, floorSize);
  const floorMaterial = new MeshPhongMaterial({
    color: 'purple',
  });
  const floorMesh = new Mesh(floorGeometry, floorMaterial);
  floorMesh.rotation.x = Math.PI * -0.5;
  scene.add(floorMesh);
  
  const light = new PointLight('white');
  light.position.set(5, 10, -5);
  scene.add(light);

  const resize = (canvasEl: HTMLCanvasElement) => {
    const { clientWidth, clientHeight, width, height } = canvasEl;

    if (clientWidth === width || clientHeight === height) return;

    camera.aspect = clientWidth / clientHeight;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.updateProjectionMatrix();
  }
  
  const orbit = new OrbitControls(camera, canvasEl);
  orbit.target.set(0, 0, 0);

  const STARTING_Y = 2;
  const MAX_Y = 6;

  const update = (time: number) => {
    resize(canvasEl);
    
    const sinOutput = Math.abs(Math.sin(time / 500));
    const yPosition = STARTING_Y + (MAX_Y - STARTING_Y) * sinOutput;
    sphereMesh.position.y = yPosition;
    
    renderer.render(scene, camera);
    orbit.update();
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

main();