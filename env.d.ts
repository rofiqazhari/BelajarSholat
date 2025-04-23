/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_AUTH_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
