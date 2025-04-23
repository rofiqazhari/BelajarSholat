<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <v-empty-state
    headline="404"
    title="Periksa kembali URL"
    text="Klik untuk kembali ke halaman sebelumnya"
  >
    <template #actions>
      <v-btn variant="text" tile text="Kembali" @click="router.back()"></v-btn>
    </template>
  </v-empty-state>
</template>
