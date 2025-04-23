<script setup lang="ts">
type TProps = {
  show?: boolean;
  message?: string;
};

type TEmits = {
  yes: [];
  close: [];
};

const emits = defineEmits<TEmits>();

withDefaults(defineProps<TProps>(), {
  show: false,
  message: "",
});

const confirm = () => {
  emits("yes");
  emits("close");
};
</script>
<template>
  <v-dialog :model-value="show" width="400" persistent>
    <v-card>
      <v-toolbar color="white" title="Konfirmasi"></v-toolbar>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" color="red" @click="$emit('close')">Batal</v-btn>
        <v-btn variant="text" color="primary" @click="confirm">Ya</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
