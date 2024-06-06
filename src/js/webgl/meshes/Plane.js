import {
  Color,
  Mesh,
  Object3D,
  PlaneGeometry,
  ShaderMaterial,
  Vector3,
} from "three"
import store from "@/js/store/globalStore";
import { getAsset } from '@/js/utils/assetsLoader'
import trail from "@/js/webgl/utils/fbo/trail";
import vertexShader from "@/js/webgl/shaders/plane.vs.glsl";
import fragmentShader from "@/js/webgl/shaders/plane.fs.glsl";
import { sceneFolder } from "@/js/utils/debugger";
import { copyData, createFolder } from "../../utils/debugger";

const PARAMS = {
  color: 'rgb(255,0,0)',
  active: true,
  rotation: {x: 0, y: 0, z: 1}
}

export default class extends Object3D {
  constructor(options) {
    super(options);

    this.geometry = new PlaneGeometry(1, 1)
    this.createMaterial()
    this.createMesh()
    this.onResize()

    this.addDebug()
  }

  addDebug() {
    const debug = createFolder(sceneFolder, { title: 'Plane' })
    debug.addBinding(PARAMS, 'color').on('change', (ev) => {
      this.material.uniforms.uColor.value = new Color(ev.value)
    })
    copyData(debug)
  }

  createMaterial() {
    this.material = new ShaderMaterial({
      uniforms: {
        uTime: {value: 0},
        uResolution: {value: new Vector3()},
        uColor: {value: new Color(PARAMS.color)},
        // tMap: {value: getAsset('tex-cat')}
        // tTrail: {value: trail.fbo.target }
      },
      // transparent: true,
      vertexShader,
      fragmentShader,
    });
  }

  createMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.add(this.mesh);
  }

  onTick(time) {
    const {uTime} = this.material.uniforms
    uTime.value = time
  }

  onResize() {
    const {width, height, dpr, aspect} = store.viewport
    const {uResolution} = this.material.uniforms
    uResolution.value.set(width * dpr, height * dpr, aspect) 
  }
}
