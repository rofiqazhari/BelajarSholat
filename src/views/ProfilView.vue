<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { DataPeserta } from "@/models/Peserta";

import { pesertaService } from "@/services";

const pesertas = ref<DataPeserta[] | null>([]);

onMounted(async () => {
  const datane = await pesertaService.profil(1);
  pesertas.value = datane.response;
});
</script>

<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-icon>mdi-account</v-icon>
          <span class="ml-2">IDENTITAS</span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <ul>
            <li>{{ pesertas.idc }}</li>
            <li>{{ pesertas.nama_peserta }}</li>
            <li>{{ pesertas.no_hp }}</li>
            <li>{{ pesertas.email }}</li>
            <li>{{ pesertas.alamat }}</li>
          </ul>
          <v-btn color="primary" class="mt-2 mb-2 text-sm">Detail</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
