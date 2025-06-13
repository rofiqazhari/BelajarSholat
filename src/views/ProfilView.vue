<script setup lang="ts">
const berkas = [
  {
    title: "IDENTITAS",
    icon: "mdi-account",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima",
  },
  {
    title: "PENDIDIKAN",
    icon: "mdi-school",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima",
  },
  {
    title: "PEKERJAAN",
    icon: "mdi-account-hard-hat",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima",
  },
];
</script>

<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(item, index) in berkas"
        :key="index"
        class="mb-2"
        :style="{ padding: '10px' }"
        expand
        :value="index"
      >
        <v-expansion-panel-header>
          <v-icon>{{ item.icon }}</v-icon>
          <span class="ml-2">{{ item.title }}</span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <p>{{ item.text }}</p>
          <v-btn color="primary" class="mt-2 mb-2 text-sm">Detail</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
