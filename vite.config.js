import { defineConfig } from "vite";
import { resolve } from 'path';
import { glslify } from 'vite-plugin-glslify';

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      glslify()
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