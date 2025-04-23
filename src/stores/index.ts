// Utilities
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

export default pinia;

export { useAlertsStore } from "./alerts.store";
export { useAppStore } from "./app.store";
export { useSettingStore } from "./settings.store";
export { useUserStore } from "./user.store";
