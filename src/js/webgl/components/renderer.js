import { WebGLRenderer, Color } from 'three';
import store from '@/js/store/globalStore';

class Renderer extends WebGLRenderer {
  constructor() {
    super({
      powerPreference: 'high-performance',
      antialiasing: false,
    })

    this.setPixelRatio(store.viewport.dpr);
    this.setClearColor(new Color("#191715"));
  }

  onResize() {
    const {viewport} = store

    this.setSize(viewport.width, viewport.height);
    this.setPixelRatio(viewport.dpr);
  }
}

export default new Renderer();