# Router

Direktori router digunakan untuk menambahkan rute yang ditujukan kepada suatu views, setiap kali
ada file baru pada direktori `views` wajib ditambahkan pada router agar file tersebut dapat diakses,
contohnya :

`halamanBaru.vue`

```vue
<template>
  <h1>Ini halaman baru</h1>
</template>
```

`router/index.ts`

```typescript
/** Tambahkan pada variabel routes */

const routes = [
  /** Route baru /halaman-baru ke views HalamanBaru.vue */
  {
    path: "/halaman-baru",
    name: "Halaman_baru",
    meta: {
      protected: true,
      title: "Halaman baru",
      menu: false,
      menu: false,
    },
    component: () => import("@/views/HalamanBaru.vue"),
  },
];
```

untuk dapat mengakses `HalamanBaru.vue` kita harus menambahkan object pada array routes dengan property:

- `path: string` URL pada browser
- `name: string` nama rute
- `meta: object` berisi objek bebas
- `component: Vue Component` komponent yang dituju
