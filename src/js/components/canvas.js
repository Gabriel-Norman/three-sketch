import { Scene } from "three";
import renderer from "@/js/webgl/components/renderer";
import camera from '@/js/webgl/components/camera'
import { Pane } from "tweakpane";

import Plane from "../webgl/meshes/Plane";
import { Emitter, GlobalRaf } from "../events";

// Debug
const tweak = new Pane();

export class Canvas {
  constructor() {
    // Add Renderer
    document.querySelector('.webgl').appendChild(renderer.domElement);

    // Add Scene
    this.scene = new Scene();

    // Needed only for debugging purposes
    this.scene.add(camera)
    
    // Enable Orbit Controls
    camera.initOrbitControl()
  }

  init() {
    this.createObjects();
    this.setupDebug();

    this.setupEventListeners();
    this.onResize();
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
    rendererDebug.addMonitor(renderer.info.memory, 'geometries', { label: 'geometr.' })
    rendererDebug.addMonitor(renderer.info.memory, 'textures')
    rendererDebug.addInput(GlobalRaf, "isPaused", {label: 'Pause Raf'});
    window.addEventListener("keyup", (e) => {
      if (e.key !== "p") return;
      GlobalRaf.isPaused = !GlobalRaf.isPaused;
      tweak.refresh();
    });

    this.plane.addDebug(tweak)
  }

  createObjects() {
    this.plane = new Plane();
    this.scene.add(this.plane);
  }

  onTick = ({ delta, time, rafDamp }) => {
    this.plane?.onTick(time)

    // Update camera
    camera?.onTick()

    // Update renderer
    renderer.render(this.scene, camera);
  };

  onResize = () => {
    this.plane?.onResize();

    // Update camera
    camera?.onResize()

    // Update renderer
    renderer?.onResize()
  };
}