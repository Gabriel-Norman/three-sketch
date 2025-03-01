import {
  WebGLRenderTarget,
  Camera,
  RGBAFormat,
  Mesh,
  Scene,
  RawShaderMaterial,
  Vector2,
} from 'three';
  
import renderer from '@/js/webgl/components/renderer';
import triangle from '@/js/webgl/utils/primitives/triangle';
import vertexShader from '@/js/webgl/shaders/postfx.vs.glsl';
import fragmentShader from '@/js/webgl/shaders/postfx.fs.glsl';
import { postFxFolder } from '@/js/utils/debugger';
  
  class PostFX {
    init() {
      this.renderer = renderer;
      this.scene = new Scene();
      this.dummyCamera = new Camera();
      this.resolution = new Vector2();
      this.renderer.getDrawingBufferSize(this.resolution);
  
      this.target = new WebGLRenderTarget(this.resolution.x, this.resolution.y, {
        format: RGBAFormat,
        stencilBuffer: false,
        depthBuffer: true,
      });
  
      const defines = {
        FXAA: false
      };
  
      this.material = new RawShaderMaterial({
        defines,
        fragmentShader,
        vertexShader,
        uniforms: {
          tDiffuse: { value: this.target.texture },
          uResolution: { value: this.resolution },
        },
      });
  
      this.triangle = new Mesh(triangle, this.material);
      this.triangle.frustumCulled = false;
      this.scene.add(this.triangle);

      this.addDebug()
    }

    addDebug() {
      const effectsFolder = postFxFolder.addFolder({ title: 'Effects' })
    }
  
    onResize() {
      this.renderer.getDrawingBufferSize(this.resolution);
      this.target.setSize(this.resolution.x, this.resolution.y);
    }
  
    render(scene, camera) {
      this.renderer.setRenderTarget(this.target);
      this.renderer.render(scene, camera);
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.scene, this.dummyCamera);
    }
  }
  
  export default new PostFX();