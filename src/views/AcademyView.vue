<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { DataPeserta } from "@/models/Peserta";

import { pesertaService } from "@/services";

const pesertas = ref<DataPeserta[] | null>([]);

onMounted(async () => {
  const datane = await pesertaService.dataPeserta();
  pesertas.value = datane.response;
});
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="5" lg="4" xl="3">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Nama Peserta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pesertas" :key="item.idc">
              <td>{{ item.idc }}</td>
              <td>{{ item.nama_peserta }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
