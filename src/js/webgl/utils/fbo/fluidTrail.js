import { Fluid } from './fluid'
import { Vector2 } from 'three';
import store from '@/js/store/globalStore';
import renderer from '@/js/webgl/components/renderer';
import { Emitter } from '@/js/events';

// https://github.com/alienkitty/alien.js/blob/main/examples/three/shader_fluid_distortion.html

class FluidTrail {
	constructor() {
		this.init();
        this.lastMouse = new Vector2();
	}

	init() {
        this.fbo = new Fluid(renderer, {
            curlStrength: 0,
			// densityDissipation: .998,
			// radius: .8
        })

		Emitter.on('site:pointer:move', this.onPointerMove)
		Emitter.on('site:resize', this.onResize)
		Emitter.on('site:tick', this.onTick)
	}

	destroy() {
		Emitter.off('site:pointer:move', this.onPointerMove)
		Emitter.off('site:resize', this.onResize)
		Emitter.off('site:tick', this.onTick)
		this.fbo.dispose()
	}

	onPointerMove = ({ state }) => {
        const { viewport } = store
        const { pos } = state;

        // First input
        if (!this.lastMouse.isInit) {
            this.lastMouse.isInit = true;
            this.lastMouse.copy(pos);
        }

        const deltaX = pos.x - this.lastMouse.x;
        const deltaY = pos.y - this.lastMouse.y;

        this.lastMouse.copy(pos);

        // Add if the mouse is moving
        if (Math.abs(deltaX) || Math.abs(deltaY)) {
            // Update fluid simulation inputs
            this.fbo.splats.push({
                // Get mouse value in 0 to 1 range, with Y flipped
                x: pos.x / viewport.width,
                y: 1 - pos.y / viewport.height,
                dx: deltaX * 5,
                dy: deltaY * -5
            });
        }
	}

	onTick = () => {
        this.fbo.update();
	}

	onResize = () => {
		const { viewport } = store
		const { uAspect } = this.fbo.splatMaterial.uniforms;
		uAspect.value = viewport.aspect;
	}
}

export default new FluidTrail();