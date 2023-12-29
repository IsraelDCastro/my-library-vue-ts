import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import typescript2 from 'rollup-plugin-typescript2';
import dts from "vite-plugin-dts";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import sassDts from 'vite-plugin-sass-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    sassDts(),
    viteStaticCopy({
      targets: [
        { src: "src/assets/my-library-vue-ts.scss", dest: "dist/assets" },
        { src: "src/assets/scss", dest: "dist/assets" },
      ],
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    })
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/components/index.ts",
      name: "myLibraryVueTs",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `my-library-vue-ts.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      input: {
        main: path.resolve(__dirname, "src/components/main.ts"),
      },
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "main.css") return "my-library-vue-ts.min.css";
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
