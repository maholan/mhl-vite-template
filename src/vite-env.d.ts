/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL of the running Storybook instance. Defaults to http://localhost:6006. */
  readonly VITE_STORYBOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
