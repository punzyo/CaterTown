interface ImportMetaEnv {
    readonly VITE_FIREBASE_CONFIG: string;
    readonly VITE_LIVEKIT_CLOUD_URL: string;
    readonly VITE_LIVEKIT_API_KEY: string;
    readonly VITE_LIVEKIT_SERVER_URL: string;
    readonly VITE_GITHUB_WEBHOOK_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }