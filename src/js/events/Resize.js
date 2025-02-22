import WebGLStore from '@/js/webgl/WebGLStore'
import Emitter from "./Emitter";

class Resize {
  constructor() {
    this.init();
  }

  init() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  onResize = () => {
    WebGLStore.onResize(window.innerWidth, window.innerHeight)
    Emitter.emit('site:resize', {})
  };
}

export default new Resize();
