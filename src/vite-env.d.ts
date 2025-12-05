interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // adicione outras variáveis conforme necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
