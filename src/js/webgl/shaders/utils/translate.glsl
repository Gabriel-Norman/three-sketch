vec2 translateUV(vec2 uv, vec2 translate) {
    return uv - translate;
}

#pragma glslify: export(translateUV)