import gsap from 'gsap'
import { EventDispatcher } from 'three'
import { SCENES } from './store/constants'

class WebGLStore extends EventDispatcher {
  #viewport
  #settings
  #state

  constructor () {
    super()

    this.#viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspect: window.innerWidth / window.innerHeight,
      dpr: gsap.utils.clamp(1, 2, window.devicePixelRatio),
      breakpoints: {
        xl: false,
        lg: false,
        md: false
      }
    }

    this.#settings = {
      device: {
        tier: 1,
        isMobile: false
      }
    }

    this.#state = {
      previousScene: null,
      currentScene: SCENES.DEFAULT,
      eventsEnabled: true,
      debugHidden: true
    }
  }

  get viewport() {
    return { ...this.#viewport }
  }

  get deviceSettings() {
    return { ...this.#settings.device }
  }

  get currentScene() {
    return this.#state.currentScene
  }

  get previousScene() {
    return this.#state.previousScene
  }

  get eventsEnabled() {
    return this.#state.eventsEnabled
  }

  setDeviceSettings ({ tier, isMobile }) {
    const { device } = this.#settings
    device.tier = tier
    device.isMobile = isMobile
  }

  setEvents (value = true) {
    this.#state.eventsEnabled = value
  }

  changeScene (type) {
    this.#state.previousScene = this.#state.currentScene
    this.#state.currentScene = type
  }

  onResize (width, height) {
    this.#viewport.width = width
    this.#viewport.height = height
    this.#viewport.aspect = width / height
    this.#viewport.breakpoints.xl = width >= 1280
    this.#viewport.breakpoints.lg = width >= 1024
    this.#viewport.breakpoints.md = width >= 768
  }
}

export default new WebGLStore()
