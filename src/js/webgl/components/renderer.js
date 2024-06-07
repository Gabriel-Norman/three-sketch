import { WebGLRenderer, Color } from 'three';
import Stats from 'stats-js'
import store from '@/js/store/globalStore';
import tweak from '@/js/utils/debugger'

import { GlobalRaf } from "@/js/events";
import { tweakFolder } from '@/js/utils/debugger';

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
    const debug = tweakFolder.addFolder({ title: 'Renderer', index: 0 })
    debug.expanded = false
    debug.addBinding(this.info.memory, 'geometries', { label: 'geometries', readonly: true })
    debug.addBinding(this.info.memory, 'textures', {readonly: true})
    debug.addBinding(GlobalRaf, "isPaused", {label: 'Pause Raf'});
    debug.children[debug.children.length - 1].element.after(this.stats.dom)
    window.addEventListener("keyup", (e) => {
      if (e.key !== "p") return;
      GlobalRaf.isPaused = !GlobalRaf.isPaused;
      tweak.refresh();
    });
  }

  onResize() {
    const {viewport} = store

    this.setSize(viewport.width, viewport.height);
    this.setPixelRatio(viewport.dpr);
  }
}

export default new Renderer();