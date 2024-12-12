/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // Tambahkan variabel lain jika diperlukan
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
