import '../scss/style.scss'
import { Preloader } from './components/preloader'
import { Canvas } from './components/canvas'
import { getAsset } from './utils/assetsLoader'

class App {
  constructor() {
    this.preloader = new Preloader()
    this.canvas = new Canvas()

    this.init()
  }

  async init() {
    // await this.preloader.load()
    this.canvas.init()
  }
}

new App()