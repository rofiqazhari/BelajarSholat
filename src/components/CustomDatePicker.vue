<script setup lang="ts">
import { computed, ref } from "vue";

const date = defineModel<Date>({ required: true });
const picker = ref(false);
const prevDate = () => (date.value = new Date(date.value.setDate(date.value.getDate() - 1)));
const nextDate = () => (date.value = new Date(date.value.setDate(date.value.getDate() + 1)));

const localeDate = computed(() =>
  date.value.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })
);
</script>

<template>
  <v-locale-provider locale="id">
    <div style="width: 330px" class="bg-white">
      <v-menu v-model="picker" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-text-field
            :model-value="localeDate"
            class="centered-input input-cursor-pointer"
            color="primary"
            density="compact"
            hide-details
            menu-icon=""
            outlined
            readonly
            single-line
            style="cursor: pointer"
            v-bind="props"
            variant="outlined"
          >
            <template #prepend-inner>
              <v-btn
                density="comfortable"
                icon="mdi-chevron-left"
                variant="plain"
                @click.stop="prevDate"
              ></v-btn>
            </template>

            <template #append-inner>
              <v-btn
                density="comfortable"
                icon="mdi-chevron-right"
                variant="plain"
                @click.stop="nextDate"
              ></v-btn>
            </template>
          </v-text-field>
        </template>

        <v-date-picker
          v-model="date"
          color="primary"
          hide-header
          @update:model-value="picker = false"
        ></v-date-picker>
      </v-menu>
    </div>
  </v-locale-provider>
</template>

<style scoped>
.centered-input :deep(input) {
  text-align: center;
}
.input-cursor-pointer :deep(input) {
  cursor: pointer;
}
</style>
