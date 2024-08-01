vec3 vignette(vec2 uv, vec3 color, float vigPow, float vigRed) {
	uv *=  1.0 - uv.yx;
	return ((1.-vigRed) + pow(uv.x*uv.y*16., vigPow) *vigRed) * color;
}

#pragma glslify: export(vignette)
