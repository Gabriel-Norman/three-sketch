import store from '../store/globalStore'
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
    const {viewport} = store;

    viewport.width = window.innerWidth
    viewport.height = window.innerHeight

    Emitter.emit('site:resize', {})
  };
}

export default new Resize();
