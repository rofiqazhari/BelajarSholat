<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import { ref, watch } from "vue";
import type { VForm } from "vuetify/components";

import { storeToRefs } from "pinia";

import "@/extension/string.extension";
import { useSettingStore } from "@/stores/settings.store";

type TProps = {
  show: boolean;
};

type TEmits = {
  close: [];
};

const prop = withDefaults(defineProps<TProps>(), {
  show: false,
});

const emits = defineEmits<TEmits>();

/**
 * Composables
 */
const setting = useSettingStore();

/**
 * Data | Ref
 */
const form = useTemplateRef("form");
const { printer, printerList, printerIp, isLoadPrinter, ipList } = storeToRefs(setting);
const currentIp = ref("");

const refreshPrinter = async () => {
  const { valid } = await form.value!.validate();
  if (!valid) return;
  printerIp.value = currentIp.value;
  await setting.prefetchPrinter();
};

const printerStatusColor = reactive({
  "-1": "red",
  "0": "green",
  "1": "warning",
});

/**
 * Lifecycle
 */
watch(
  () => prop.show,
  (val) => {
    if (val && printerIp.value != "") currentIp.value = printerIp.value;
  }
);
</script>
<template>
  <v-dialog width="400" :model-value="show" @update:model-value="emits('close')">
    <v-form ref="form">
      <v-card>
        <v-toolbar title="Pengaturan" color="primary"></v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="currentIp"
                :loading="isLoadPrinter"
                variant="outlined"
                density="compact"
                label="IP Komputer"
                hide-details="auto"
                :items="ipList"
                color="primary"
                append-inner-icon="mdi-laptop"
                @click:append-inner="setting.fetchIpList"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="printer"
                :items="printerList"
                item-title="label"
                return-object
                density="compact"
                variant="outlined"
                label="Printer"
                hide-details="auto"
                color="primary"
                :loading="isLoadPrinter"
                append-inner-icon="mdi-magnify"
                @click:append-inner="refreshPrinter"
              >
                <template #item="{ item, props }">
                  <v-list-item density="compact" v-bind="props" :title="item.raw.label">
                    <template #prepend>
                      <v-icon
                        icon="mdi-printer"
                        :color="
                          printerStatusColor[
                            item.raw.status.toString() as keyof typeof printerStatusColor
                          ]
                        "
                      ></v-icon>
                    </template>
                    <v-list-item-subtitle>{{ item.raw.statusCategory }}</v-list-item-subtitle>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="red" @click="emits('close')"> Tutup </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
