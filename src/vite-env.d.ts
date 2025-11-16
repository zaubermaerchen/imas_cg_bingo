interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_PATH?: string
  readonly VITE_API_SERVER_URL: string
  readonly VITE_IMAGE_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
