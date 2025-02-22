import { WebGLRenderer, Color } from 'three';
import Stats from 'stats-js'
import WebGLStore from "@/js/webgl/WebGLStore";
import tweak from '@/js/utils/debugger'

import { GlobalRaf } from "@/js/events";
import { rendererFolder } from '@/js/utils/debugger';

class Renderer extends WebGLRenderer {
  constructor() {
    super({
      powerPreference: 'high-performance',
      antialiasing: false,
    })

    this.setClearColor(new Color("#191715"));
    this.addStats()
    this.addDebug()
  }

  addStats () {
    this.stats = new Stats()
    this.stats.dom.style.position = 'relative'
    this.stats.dom.style.display = 'flex'
    this.stats.dom.style.flexDirection = 'row'
    this.stats.dom.style.justifyContent = 'flex-start'
    this.stats.dom.style.pointerEvents = 'none'
    for (const child of this.stats.dom.children) {
      child.style.display = 'inline-block'
    }
  }

  addDebug() {
    rendererFolder.addBinding(this.info.memory, 'geometries', { label: 'geometries', readonly: true })
    rendererFolder.addBinding(this.info.memory, 'textures', {readonly: true})
    rendererFolder.addBinding(GlobalRaf, "isPaused", {label: 'Pause Raf'});
    rendererFolder.children[rendererFolder.children.length - 1].element.after(this.stats.dom)
    window.addEventListener("keyup", (e) => {
      if (e.key !== "p") return;
      GlobalRaf.isPaused = !GlobalRaf.isPaused;
      tweak.refresh();
    });
  }

  onResize() {
    const {width, height, dpr} = WebGLStore.viewport

    this.setSize(width, height);
    this.setPixelRatio(dpr);
  }
}

export default new Renderer();