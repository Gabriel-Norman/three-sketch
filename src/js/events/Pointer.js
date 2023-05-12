import store from '../store/globalStore'
import Emitter from "./Emitter";

class Pointer {
  constructor() {
    this.state = {
      pos: {
        x: 0,
        y: 0
      },
      isDown: false
    }

    this.init();
  }

  init() {
    document.addEventListener('pointerdown', this.onPointerDown)
    document.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('pointerup', this.onPointerUp)
    window.addEventListener('pointerleave', this.onPointerUp)
  }

  onPointerDown = () => {
    const {viewport} = this.state;
    Emitter.emit('site:pointerdown', {})
  };

  onPointerMove = (e) => {
    const {clientX, clientY} = e
    const {pos} = this.state;
    pos.x = clientX
    pos.y = clientY
    Emitter.emit('site:pointermove', {})
  };

  onPointerUp = () => {
    const {viewport} = store;
    Emitter.emit('site:pointerup', {})
  };
}

export default new Pointer();
