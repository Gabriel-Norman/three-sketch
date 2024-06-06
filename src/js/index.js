import '../scss/style.scss'
import { Preloader } from './components/preloader'
import WebGLApp from './components/WebGLApp'

class App {
  constructor() {
    this.preloader = new Preloader()
    this.webgl = new WebGLApp()

    this.init()
  }

  async init() {
    await this.preloader.load()
    this.webgl.init()
  }
}

new App()