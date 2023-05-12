import {
    Color,
    Mesh,
    Object3D,
    PlaneGeometry,
    ShaderMaterial,
    Vector2,
  } from "three"
  import store from "../store/globalStore";
  
  const PARAMS = {
    color: 'rgb(255,0,0)'
  }
  
  import vertex from "../../shaders/plane.vs.glsl";
  import fragment from "../../shaders/plane.fs.glsl";
  
  export default class extends Object3D {
    constructor(options) {
      super(options);
  
      this.geometry = new PlaneGeometry(1, 1)
      this.createMaterial()
      this.createMesh()
      this.onResize()
    }
  
    addDebug(pane) {
      pane.addInput(PARAMS, 'color').on('change', (ev) => {
        this.material.uniforms.uColor.value = new Color(ev.value)
      })
    }
  
    createMaterial() {
      this.material = new ShaderMaterial({
        uniforms: {
          uTime: {value: 0},
          uResolution: {value: new Vector2()},
          uRatio: {value: 0},
          uColor: {value: new Color(PARAMS.color)}
        },
        // transparent: true,
        vertexShader: vertex,
        fragmentShader: fragment,
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
  