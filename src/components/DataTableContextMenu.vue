<script setup lang="ts" generic="T">
import type { TContextMenu, TMenu } from "@/types";

const contextMenu = defineModel<TContextMenu<T>>({
  default: { show: false },
});

const props = defineProps<{
  menus: Array<TMenu>;
}>();

const emit = defineEmits<{
  click: [menu: TMenu, data?: T];
}>();
</script>

<template>
  <v-menu v-model="contextMenu.show" :target="contextMenu.location">
    <v-list density="compact" color="success" selectable min-width="160" max-width="320">
      <slot name="header" :item="contextMenu.data"></slot>

      <template v-for="menu in props.menus" :key="menu.value">
        <v-list-item
          v-if="menu.title"
          lines="one"
          :disabled="menu.disabled"
          :title="menu.title"
          @click="emit('click', menu, contextMenu.data)"
        />

        <v-divider v-else />
      </template>

      <slot name="footer" :item="contextMenu.data"></slot>
    </v-list>
  </v-menu>
</template>
