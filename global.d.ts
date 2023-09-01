declare namespace NodeJS {
  interface ProcessEnv {
    VUE_APP_API_LOGIN_URL: string;
    VUE_APP_API_CHAT_URL: string;
  }
}

interface Process {
  env: NodeJS.ProcessEnv;
}

declare const process: Process;
export {};
