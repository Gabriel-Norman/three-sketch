import { Scene } from 'three';
import camera from '@/js/webgl/components/camera';
import Plane from "@/js/webgl/meshes/Plane";

class Stage extends Scene {
  init() {
    this.add(camera)

    this.plane = new Plane();
    this.add(this.plane)
  }

  onTick ({time}) {
    for (const child of this.children) {
      child.onTick?.(time)
    }
  }

  onResize () {
    for (const child of this.children) {
      child.onResize?.()
    }
  }
}

export default new Stage();