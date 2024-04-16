interface ImportMetaEnv {
  readonly VITE_AUTH_URL: string;
  readonly VITE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
