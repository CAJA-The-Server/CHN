namespace NodeJS {
  interface ProcessEnv
    extends Record<
      | "SERVER_PORT"
      | "SESSION_SECRET"
      | "DB_HOST"
      | "DB_PORT"
      | "DB_USERNAME"
      | "DB_PASSWORD"
      | "DB_NAME"
      | "DB_POOL_SIZE",
      string
    > {}
}