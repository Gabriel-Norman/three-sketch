import renderer from "@/js/webgl/components/renderer"
import camera from '@/js/webgl/components/camera'
import scene from '@/js/webgl/components/scene'
import fluidTrail from "@/js/webgl/utils/fbo/fluidTrail";
import postfx from '@/js/webgl/components/postfx'

class WebGLApp {
  static #instance = null

  constructor() {
    if (WebGLApp.#instance) {
      throw new Error('WebGLApp is a singleton. Use WebGLApp.getInstance() instead.');
    }
    WebGLApp.#instance = this;
  }

  static getInstance() {
    if (!WebGLApp.#instance) {
      WebGLApp.#instance = new WebGLApp();
    }
    return WebGLApp.#instance;
  }

  init() {
    document.querySelector('.webgl').appendChild(renderer.domElement)

    camera.init()
    fluidTrail.init()
    scene.init()
    // postfx.init()
  }

  onTick = (obj) => {
    scene?.onTick(obj)
    fluidTrail?.onTick()
    renderer?.render(scene, camera)
    renderer?.stats?.update()
    // postfx?.render(scene, camera)
  }

  onResize = () => {
    camera?.onResize()
    fluidTrail?.onResize()
    scene?.onResize()
    renderer?.onResize()
    // postfx?.onResize()
  }
}

export default WebGLApp.getInstance()