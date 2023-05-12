// #pragma glslify: coverTexture = require('./utils/coverTexture')
precision highp float;

uniform vec3 uColor;
uniform vec2 uResolution;
uniform sampler2D uTex;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy / uResolution;

    vec3 col = uColor;
    // vec4 tex = coverTexture(uTex, vec2(100., 100.), vUv, uResolution);

    gl_FragColor = vec4(col, 1.);
}