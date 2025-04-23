import tailwindcss from "@tailwindcss/vite";
import Vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import ViteFonts from "unplugin-fonts/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
// import VueDevTools from "vite-plugin-vue-devtools";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // VueDevTools(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    Components(),
    ViteFonts({
      fontsource: {
        families: ["Roboto Flex Variable"],
      },
    }),
    tailwindcss(),
  ],
  base: "/belajarsholat/",
  build: {
    outDir: "belajarSholat",
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 9000,
  },
});
