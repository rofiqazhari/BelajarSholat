<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function back() {
  history.back();
}

function logout() {
  localStorage.clear();
  router.replace("/");
}
</script>

<template>
  <v-empty-state
    headline="403"
    title="Anda tidak memiliki hak akses"
    text="Klik untuk kembali ke halaman sebelumnya."
  >
    <template #actions>
      <v-btn variant="flat" text="Kembali" color="primary" @click="back()"></v-btn>
      <v-btn variant="flat" text="Logout" color="red" @click="logout"></v-btn>
    </template>
  </v-empty-state>
</template>
