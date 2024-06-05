import {
  Color,
  Mesh,
  Object3D,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
} from "three"
import store from "../../store/globalStore";
import { getAsset } from '../../utils/assetsLoader'
import tweak from '@/js/utils/debugger'
import trail from "@/js/webgl/utils/fbo/trail";
  
const PARAMS = {
  color: 'rgb(255,0,0)'
}

import vertexShader from "@/js/webgl/shaders/plane.vs.glsl";
import fragmentShader from "@/js/webgl/shaders/plane.fs.glsl";

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
    tweak.addBinding(PARAMS, 'color').on('change', (ev) => {
      this.material.uniforms.uColor.value = new Color(ev.value)
    })
  }

  createMaterial() {
    this.material = new ShaderMaterial({
      uniforms: {
        uTime: {value: 0},
        uResolution: {value: new Vector2()},
        uRatio: {value: 0},
        uColor: {value: new Color(PARAMS.color)},
        // uTrail: {value: trail.fbo.target }
        // uTex: {value: getAsset('tex-cat')}
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
    const {viewport} = store
    const {uResolution, uRatio} = this.material.uniforms
    uResolution.value.set(viewport.width, viewport.height) 
    uRatio.value = viewport.aspect
  }
}
