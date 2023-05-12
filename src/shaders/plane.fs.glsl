precision highp float;

uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy / uResolution;

    vec3 col = uColor;

    gl_FragColor = vec4(col, 1.);
}