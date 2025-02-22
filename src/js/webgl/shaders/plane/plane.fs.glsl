precision highp float;

uniform sampler2D tMap;
uniform sampler2D tTrail;
uniform sampler2D tBlueNoise;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uBlueNoiseTexelSize;
uniform vec2 uBlueNoiseCoordOffset;
uniform float uTime;

varying vec4 vMvPos;
varying vec3 vWorldPos;
varying vec3 vViewDirection;
varying vec2 vUv;

// #pragma glslify: coverTexture = require('./utils/coverTexture')
// #pragma glslify: translateUV = require('./utils/translate')
// #pragma glslify: scaleUV = require('./utils/scale')
// #pragma glslify: rotateUV = require('./utils/rotate')

vec3 getBlueNoise(vec2 coord) {
    return texture2D(tBlueNoise, coord * uBlueNoiseTexelSize + uBlueNoiseCoordOffset).rgb;
}
vec3 getBlueNoiseStatic(vec2 coord) {
    return texture2D(tBlueNoise, coord * uBlueNoiseTexelSize).rgb;
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec4 fluid = texture2D(tTrail, st);
    vec3 bnoise = getBlueNoiseStatic(gl_FragCoord.xy);

    vec2 uv = vUv - fluid.rg * 0.0002;
    // vec3 col = uColor;
    // vec4 tex = coverTexture(tMap, vec2(100., 100.), vUv, uResolution);
    vec4 tex = texture2D(tMap, uv);
    vec3 col = tex.rgb * uColor;
    // col += bnoise * 0.05;

    gl_FragColor = vec4(col, 1.);
    // gl_FragColor = vec4(vec3(st, 0.), 1.);
    // gl_FragColor = vec4(bnoise, 1.);
    // gl_FragColor = fluid;
}