vec2 coverUv(vec2 imgSize, vec2 ouv, vec2 res) {
    vec2 s = res;
    vec2 i = imgSize;
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;

    return ouv * s / new + offset;
}

#pragma glslify: export(coverUv)
