<script setup lang="ts">
import { onMounted } from "vue";

import { useKunjunganStore } from "@/stores";

const kunjunganStore = useKunjunganStore();

onMounted(async () => {
  kunjunganStore.getKunjungan();
});
const hari = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <!-- <v-col cols="12" sm="6" md="5" lg="4" xl="3">
        <v-progress-linear indeterminate color="primary" />
      </v-col> -->

      <v-col cols="12" sm="6" md="5" lg="4" xl="3">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Tanggal</th>
              <th class="text-left">Hari</th>
              <th class="text-center">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in kunjunganStore.kunjungans" :key="item.tgl_registrasi">
              <td>{{ item.tgl_registrasi }}</td>
              <td>{{ hari[new Date(item.tgl_registrasi).getDay()] }}</td>
              <td class="text-center">{{ item.jumlah }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
