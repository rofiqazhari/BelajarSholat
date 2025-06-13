import { ref } from "vue";

import { defineStore } from "pinia";

import type { KunjunganTanggal } from "@/models/KunjunganTanggal";

import { kunjunganService } from "@/services";

export const useKunjunganStore = defineStore("kunjungan", () => {
  const loading = ref(true);
  const kunjungans = ref<KunjunganTanggal[] | null>([]);

  async function getKunjungan() {
    loading.value = false;

    const kunjunganTgl = await kunjunganService.kunjunganTanggal("2025-01-01", "2025-01-30");
    kunjungans.value = kunjunganTgl.response;
  }

  return {
    getKunjungan,
    kunjungans,
    loading,
  };
});
