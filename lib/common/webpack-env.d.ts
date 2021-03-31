/// <reference types="webpack-env" />

declare namespace __WebpackModuleApi {
  interface Hot {
    readonly check(autoApply: boolean): Promise<__WebpackModuleApi.ModuleId[]>;
  }
  interface NodeProcess {
    readonly env?: {
      readonly NODE_ENV: "development" | "production";
    };
  }
}
