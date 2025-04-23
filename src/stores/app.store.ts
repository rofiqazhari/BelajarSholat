import { ref } from "vue";

import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  /**
   * Digunakan untuk mengubah subtitle pada halaman
   */
  const subtitle = ref<string | null | undefined>();

  return {
    subtitle,
  };
});
