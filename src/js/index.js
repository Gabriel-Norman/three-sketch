import '../scss/style.scss'
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import store from "./store/globalStore";
import gsap from "gsap";

import Plane from "./meshes/Plane";
import { Emitter, GlobalRaf } from "./events";

// Debug
const tweak = new Pane();

class Canvas {
  constructor() {
    store.viewport.width = window.innerWidth;
    store.viewport.height = window.innerHeight;

    this.createRenderer();
    this.createScene();
    this.createCamera();
    this.createControls();

    this.createObject();

    this.setupEventListeners();
    this.onResize();

    this.setupDebug();
  }

  setupEventListeners() {
    window.addEventListener("pointermove", this.onPointerMove);
    Emitter.on('site:resize', this.onResize)
    Emitter.on("site:tick", this.onTick);
  }

  setupDebug() {
    // Raf debugger
    const rendererDebug = tweak.addFolder({
        title: 'renderer'
    })
    rendererDebug.expanded = false
    rendererDebug.addMonitor(this.renderer.info.memory, 'geometries', { label: 'geometr.' })
    rendererDebug.addMonitor(this.renderer.info.memory, 'textures')
    rendererDebug.addInput(GlobalRaf, "isPaused", {label: 'Pause Raf'});
    window.addEventListener("keyup", (e) => {
      if (e.key !== "p") return;
      GlobalRaf.isPaused = !GlobalRaf.isPaused;
      tweak.refresh();
    });

    this.plane.addDebug(tweak)
  }

  createRenderer() {
    const { width, height } = store.viewport;
    this.canvas = document.querySelector("canvas.webgl");

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setClearColor(new Color("#191715"));
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(
      gsap.utils.clamp(1, 2, window.devicePixelRatio)
    );
  }

  createScene() {
    this.scene = new Scene();
  }

  createCamera() {
    const { width, height } = store.viewport;
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 1);
    this.scene.add(this.camera);
  }

  createControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
  }

  createObject() {
    this.plane = new Plane();
    this.scene.add(this.plane);
  }

  onTick = ({ delta, time }) => {
    // Update controls
    this.controls.update();

    this.plane.onTick(time)

    // Render
    this.renderer.render(this.scene, this.camera);
  };

  onResize = () => {
    const { clamp } = gsap.utils;
    const { viewport, canvasSizes } = store;

    // Update camera
    this.camera.aspect = viewport.width / viewport.height;
    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z || 0;
    const width = height * this.camera.aspect || 0;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(viewport.width, viewport.height);
    this.renderer.setPixelRatio(clamp(1, 1.5, window.devicePixelRatio));

    // Update sizes
    canvasSizes.width = width;
    canvasSizes.height = height;

    this.plane.onResize();
  };
}

new Canvas();
