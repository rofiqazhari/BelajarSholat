import { ref } from "vue";

import { defineStore } from "pinia";

import type { KunjunganTanggal } from "@/models/KunjunganTanggal";

import { pesertaService } from "@/services";

export const useKunjunganStore = defineStore("kunjungan", () => {
  const loading = ref(true);
  const kunjungans = ref<KunjunganTanggal[] | null>([]);

  async function getKunjungan() {
    loading.value = false;

    const kunjunganTgl = await pesertaService.kunjunganTanggal(1);
    kunjungans.value = kunjunganTgl.response;
  }

  return {
    getKunjungan,
    kunjungans,
    loading,
  };
});
