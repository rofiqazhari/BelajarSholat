<script setup lang="ts">
import { ref } from "vue";
//--------------START--------------
import { onMounted } from "vue";

import { useKunjunganStore } from "@/stores";

const kunjunganStore = useKunjunganStore();

onMounted(async () => {
  kunjunganStore.getKunjungan();
});
//--------------STOP--------------

const labels = ref(
  kunjunganStore.kunjungans?.map((kunjungan) => kunjungan.tgl_registrasi.slice(-2)) || []
);
const value = ref(kunjunganStore.kunjungans?.map((kunjungan) => kunjungan.jumlah) || []);
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="5" lg="4" xl="3">
        <v-card title="Informasi" text="..." variant="tonal"></v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="5" lg="4" xl="3">
        <v-card title="Layanan" text="..." variant="tonal"></v-card>
      </v-col>
    </v-row>

    <v-card class="mt-8 mx-auto overflow-visible" max-width="400">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
        rounded="lg"
      >
        <v-sparkline
          :labels="labels"
          :model-value="value"
          color="white"
          line-width="2"
          padding="16"
        ></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-1">
        <div class="subheading font-weight-light text-grey">Kunjungan April 2025</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
