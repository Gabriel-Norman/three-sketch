import {
  Color,
  Mesh,
  Object3D,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  Vector3
} from "three"
import WebGLStore from "@/js/webgl/WebGLStore";
import { getAsset } from '@/js/utils/assetsLoader'
import trail from "@/js/webgl/utils/fbo/trail";
import fluidTrail from "@/js/webgl/utils/fbo/fluidTrail";
import vertexShader from "@/js/webgl/shaders/plane/plane.vs.glsl";
import fragmentShader from "@/js/webgl/shaders/plane/plane.fs.glsl";
import { sceneFolder, createFolder } from "@/js/utils/debugger";

const PARAMS = {
  color: 'rgb(255,255,255)'
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
    const debug = createFolder(sceneFolder, { title: 'Plane' }, this)
    debug.addBinding(PARAMS, 'color').on('change', (ev) => {
      this.material.uniforms.uColor.value = new Color(ev.value)
    })
  }

  createMaterial() {
    this.material = new ShaderMaterial({
      uniforms: {
        uTime: {value: 0},
        uResolution: {value: new Vector3()},
        uColor: {value: new Color(PARAMS.color)},
        tMap: {value: getAsset('tex-uv')},
        // tTrail: {value: trail.fbo.target }
        tTrail: {value: fluidTrail.fbo.tex.value },
        tBlueNoise: {value: getAsset('tex-bluenoise') },
        uBlueNoiseTexelSize: {value: new Vector2(1 / 128, 1 / 128)},
        uBlueNoiseCoordOffset: {value: new Vector2(0, 0)}
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
    const {uTime, uBlueNoiseCoordOffset} = this.material.uniforms
    uTime.value = time
    uBlueNoiseCoordOffset.value.set(Math.random(), Math.random())
  }

  onResize() {
    const {width, height, dpr, aspect} = WebGLStore.viewport
    const {uResolution} = this.material.uniforms
    uResolution.value.set(width * dpr, height * dpr, aspect) 
  }
}
