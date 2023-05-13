import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import renderer from './renderer';
import store from '@/js/store/globalStore';

class Camera extends PerspectiveCamera {
  constructor() {
    super(75, 0, 0.1, 1000);

    this.position.set(0, 0, 1);
    this.lookAt(new Vector3(0, 0, 0));
    // this.targetRot = new Vector3().copy(this.rotation);
  }

  initOrbitControl() {
    this.controls = new OrbitControls(this, renderer.domElement);

    this.controls.enabled = true;
    this.controls.maxDistance = 900;
    // this.controls.minDistance = 0;
  }

  onResize() {
    const {viewport} = store
    this.aspect = viewport.aspect;

    // Dom Mapping

    // const fov = this.fov * (Math.PI / 180);
    // const height = 2 * Math.tan(fov / 2) * this.position.z || 0;
    // const width = height * this.aspect || 0;

    this.updateProjectionMatrix();
  }

  onTick() {
    this.controls?.update()
    // const x = map(pointer.normalized.y, -1, 1, -0.2, 0.2);
    // const y = map(pointer.normalized.x, -1, 1, 0.2, -0.2);
    // this.rotation.x = lerp(this.rotation.x, x, .01)
    // this.rotation.y = lerp(this.rotation.y, y, .01)
  }
}

export default new Camera();