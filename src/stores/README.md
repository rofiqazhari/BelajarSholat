# Store

store merupakan state management atau dapat disebut tempat yang berisi data dan dapat digunakan oleh view, components, dll dalam lingkungan vuejs, contoh untuk membuat store dapat dilakukan dengan cara sebagai berikut :

`dokter.store.ts`

```typescript
import { defineStore } from "pinia";

export const useDokter = defineStore("alerts", {
  state: () => ({
    daftarDokter: [],
  }),
  actions: {
    async fetchDataDokter() {
      /**
       * Action mengambil data dokter dari API
       */
    },
  },
  getters: {
    dokterBpjs(state) {
      /**
       * Melakukan Filter dokter BPJS
       */
    },
  },
});
```

lalu setiap ada file store baru harus ditambahkan di file `store/index.ts`

`store/index.ts`

```typescript
// Utilities
/**
 * Initialize pinia for vue
 */
import { createPinia } from "pinia";
export default createPinia();

/**
 * Export store
 */
export { useDokter } from "./dokter.store";
```

lalu untuk menggunakan store misalnya pada views dapat dilakukan seperti contoh di bawah :

`views/dokter.vue`

```html
<script setup>
  import { onMounted } from "vue";
  import { useDokter } from "@/store";

  const dokter = useDokter();

  onMounted(dokter.fetchDataDokter);
</script>
```
