<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  displayed: boolean;
  title: string;
  width: string;
  loading: boolean;
  submitText?: string;
}>();

const emit = defineEmits<{
  close: [];
  submit: [];
}>();

const fullscreen = ref(false);
</script>

<template>
  <v-dialog :model-value="displayed" :fullscreen persistent :width="fullscreen ? undefined : width">
    <v-card rounded="2" :loading>
      <v-toolbar height="51" color="primary" density="comfortable">
        <v-toolbar-title class="text-subtitle-1">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Maximize Button -->
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-btn
              :variant="isHovering ? 'tonal' : 'plain'"
              class="pa-0 mr-0"
              color="white"
              height="48"
              min-width="46"
              rounded="0"
              v-bind="props"
              @click="fullscreen = !fullscreen"
            >
              <v-icon v-if="fullscreen" size="small">mdi-window-restore</v-icon>
              <v-icon v-else size="small">mdi-window-maximize</v-icon>
            </v-btn>
          </template>
        </v-hover>

        <!-- Close Button -->
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-btn
              :color="isHovering ? 'red-darken-2' : 'white'"
              :variant="isHovering ? 'flat' : 'plain'"
              class="pa-0 mr-0"
              height="48"
              min-width="46"
              rounded="0"
              v-bind="props"
              @click="emit('close')"
            >
              <v-icon size="small">mdi-window-close</v-icon>
            </v-btn>
          </template>
        </v-hover>
      </v-toolbar>

      <v-card-text class="pb-2">
        <slot></slot>
      </v-card-text>

      <v-card-actions class="mx-2 mb-1">
        <slot name=""></slot>
        <slot name="actions">
          <v-spacer></v-spacer>
          <v-btn
            :disabled="loading"
            color="primary"
            rounded="2"
            type="submit"
            variant="tonal"
            width="88"
            @click="emit('submit')"
            >{{ submitText ?? "Simpan" }}</v-btn
          >
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
