import Emitter from "./Emitter";
import gsap from 'gsap';

class Pointer {
  constructor() {
    this.state = {
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      ease: 0.1,
      velocity: 0,
      normalizedVelocity: 0,
      isPressing: false
    }

    this.init();
  }

  init() {
    document.addEventListener('pointerdown', this.onPointerDown)
    document.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('pointerup', this.onPointerUp)
    window.addEventListener('pointerleave', this.onPointerUp)
    Emitter.on("site:tick", this.onTick);
  }

  onPointerDown = () => {
    const {state} = this
    state.isPressing = true

    Emitter.emit('site:pointer:down', {})
  };

  onPointerMove = (e) => {
    const {clientX, clientY} = e
    const {target} = this.state;

    target.x = clientX
    target.y = clientY
    Emitter.emit('site:pointer:move', {})
  };

  onPointerUp = () => {
    const {state} = this
    state.isPressing = false

    Emitter.emit('site:pointer:up', {})
  };

  onTick = ({rafDamp}) => {
    const {interpolate, clamp} = gsap.utils
    const {current, target, ease} = this.state;

    current.x = interpolate(current.x, target.x, ease * rafDamp);
		current.y = interpolate(current.y, target.y, ease * rafDamp);
		const mouseTravelX = Math.abs(Math.round((target.x - current.x) * 100) / 100);
		const mouseTravelY = Math.abs(Math.round((target.y - current.y) * 100) / 100);
		this.state.velocity = Math.max(mouseTravelX, mouseTravelY);
    this.state.normalizedVelocity = clamp(0, 1, this.state.velocity);

    if(this.state.normalizedVelocity !== 0) {
      Emitter.emit('site:pointer:lerping', {state: this.state})
    }

  }
}

export default new Pointer();
