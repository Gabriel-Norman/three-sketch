import '../scss/style.scss'
import { Preloader } from '@/js/components/preloader'
import WebGLApp from '@/js/webgl/WebGLApp'
import { Emitter } from "@/js/events"

class App {
  constructor() {
    this.preloader = new Preloader()
    this.webgl = WebGLApp

    this.init()
  }

  async init() {
    await this.preloader.load()
    this.webgl.init()

    this.setupEventListeners()
    this.onResize()
  }

  setupEventListeners() {
    Emitter.on('site:resize', this.onResize)
    Emitter.on("site:tick", this.onTick)
  }

  onTick = (obj) => {
    this.webgl.onTick(obj)
  }

  onResize = () => {
    this.webgl.onResize()
  }
}

new App()