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
      assetsInlineLimit: 0,
      rollupOptions: {
        input: {
          index: resolve(__dirname, "./index.html"),
          main: resolve(__dirname, "./src/js/index.js"),
        },
        output: {
          hashCharacters: 'base36'
        }
      },
    },
    resolve: {
      alias: {
        '@' : resolve(__dirname, './src')
      }
    }
  });
};