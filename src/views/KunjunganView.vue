<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { KunjunganTanggal } from "@/models/KunjunganTanggal";

import { kunjunganService } from "@/services";

// import { kunjungantanggalService } from "@/services";
// import { kunjunganpoliklinikService } from "@/services";
const kunjungans = ref<KunjunganTanggal[] | null>([]);

onMounted(async () => {
  const kunjunganTgl = await kunjunganService.kunjunganTanggal("2024-10-01", "2025-10-31");
  // const kunjunganPol = await kunjunganService.kunjunganPoliklinik("2024-10-01", "2025-10-31");
  // const kunjunganDok = await kunjunganService.kunjunganDokter("2024-10-01", "2025-10-31");
  kunjungans.value = kunjunganTgl.response;
});
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="5" lg="4" xl="3">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Tanggal</th>
              <th class="text-left">Jumlah Pasien</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in kunjungans" :key="item.tgl_registrasi">
              <td>{{ item.tgl_registrasi }}</td>
              <td>{{ item.jumlah }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
