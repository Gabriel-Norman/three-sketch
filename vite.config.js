import { defineConfig, loadEnv } from "vite";
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
    },
    // server: {
    //   cors: true,
    //   origin: "http://127.0.0.1:" + 3000,
    //   strictPort: true,
    //   port: 3000,
    //   open: process.env.VITE_WEBSITE_URL || "",
    // },
  });
};