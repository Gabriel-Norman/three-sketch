precision highp float;

uniform sampler2D tMap;
uniform sampler2D tTrail;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform float uRatio;
uniform float uTime;

varying vec2 vUv;

// #pragma glslify: coverTexture = require('./utils/coverTexture')

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec4 fluid = texture2D(tTrail, vUv);
    vec2 uv = vUv - fluid.rg * 0.0002;

    vec3 col = uColor;
    // vec4 tex = coverTexture(tMap, vec2(100., 100.), vUv, uResolution);
    // vec4 tex = texture2D(tMap, uv);

    gl_FragColor = vec4(col, 1.);
    gl_FragColor = vec4(vec3(uv, 0.), 1.);
    // gl_FragColor = fluid;
}