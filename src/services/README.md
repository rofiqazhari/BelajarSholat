# Services

direktori services digunakan untuk menyimpan berbagai fungsi HTTP Request ke API yang telah disediakan, contohnya sebagai berikut:

`auth.ts`

```typescript
export const login = async (username: string, password: string): Promise<TResponseLogin> => {
  const url = "https://api.rsmlamongan.com/auth/users/authenticate";

  const { data } = await axios.post<RestResource<TResponseLogin>>(url, {
    bearer: "database",
    username,
    password,
  });

  if (data.metadata.code !== 200) throw new Error(data.metadata.message);

  return data.response;
};
```

`auth.js`

```javascript
export const login = async (username, password) => {
  const url = "https://api.rsmlamongan.com/auth/users/authenticate";

  const { data } = await axios.post(url, {
    bearer: "database",
    username,
    password,
  });

  if (data.metadata.code !== 200) throw new Error(data.metadata.message);

  return data.response;
};
```

contoh tersebut adalah kita membuat fungsi login pada file `auth.ts` atau `auth.js` yang digunakan untuk diconsume baik oleh pinia (state management) ataupun view secara langsung.

setiap membuat file repository diwajibkan untuk menambahkan ekspor module pada file `repository/index.ts` contohnya :

```typescript
export * as dokter from "./doctor";

/** file baru pada repostory */
export * as auth from "./auth";
```

hal tersebut tujuannya untuk memudahkan kita dalam mengambil suatu repository seperti :

```typescript
/**
 * Tanpa menggunakan export default pada repository/index.ts
 */
import * as auth from "@/repository/auth";
import * as doctor from "@/repository/doctor";

/**
 * Menggunakan export default pada repository/index.ts
 */
import { auth, doctor } from "@/repository";
```
