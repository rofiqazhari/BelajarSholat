/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import { createApp } from "vue";

// Class Transformer
import "reflect-metadata";
// Self-hosting Apps
import "unfonts.css";

import "@/assets/tailwind.css";
import { useUserStore } from "@/stores/user.store";

import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");

const user = useUserStore();
user.initUser();
