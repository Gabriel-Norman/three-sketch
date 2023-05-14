import { Scene } from 'three';
import camera from './camera';

import Plane from "../meshes/Plane";

class Stage extends Scene {
  init() {
    this.plane = new Plane();
    this.add(this.plane)
    this.add(camera)
  }

  onTick({time}) {
    this.plane?.onTick(time)
  }

  onResize() {
    this.plane?.onResize()
  }
}

export default new Stage();