float luma(vec3 color) { return dot(vec3(0.299, 0.587, 0.114), color); }

#pragma glslify: export(luma)