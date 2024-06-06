// #pragma glslify: coverTexture = require('./utils/coverTexture')
precision highp float;

uniform sampler2D tMap;
uniform sampler2D tTrail;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform float uRatio;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;

    vec3 col = uColor;
    // vec4 tex = coverTexture(tMap, vec2(100., 100.), vUv, uResolution);
    // vec4 tex = texture2D(tTrail, vUv);

    gl_FragColor = vec4(col, 1.);
    // gl_FragColor = tex;
}