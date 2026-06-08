declare namespace NodeJS {
  interface ProcessEnv {
    STEAM_API_KEY: string;
    SESSION_SECRET?: string;
    DATABASE_URL?: string;
  }
}
