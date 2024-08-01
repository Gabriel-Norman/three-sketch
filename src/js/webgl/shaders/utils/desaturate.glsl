#pragma glslify: luma = require(./luma)

vec4 desaturate(vec3 color, float factor)
{
	vec3 gray = vec3(luma(color));
	return vec4(mix(color, gray, factor), 1.0);
}

#pragma glslify: export(desaturate)