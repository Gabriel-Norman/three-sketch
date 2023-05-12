import { defineConfig } from "vite";
import { resolve } from 'path'
import glsl from 'vite-plugin-glsl';

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      glsl()
    ],
    root: "",
    build: {
      outDir: resolve(__dirname, "./dist"),
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "./src/js/index.js"),
        },
      },
    }
  });
};