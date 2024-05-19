interface ImportMetaEnv {
    readonly VITE_FIREBASE_CONFIG: string;
    readonly VITE_LIVEKIT_CLOUD_URL: string;
    readonly VITE_LIVEKIT_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }