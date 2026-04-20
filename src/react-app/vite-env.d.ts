/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Django backend base URL — set in .env locally, Vercel env vars in production.
   *  Example: http://127.0.0.1:8000  (no trailing slash)
   */
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
