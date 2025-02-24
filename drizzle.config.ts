import type { Config } from "drizzle-kit";

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  driver: "d1-http",
  dialect: "sqlite",
  dbCredentials: {
    accountId: "d71f80f23771e1b6562e54477f7efd84",
    databaseId: "954ea3fa-b838-4d78-82d5-126a3be19931",
    token: "zxOh-PLPBkcufz9nRgQoXZeDwWg_nEgTtipHEs6B",
  },
} satisfies Config;
