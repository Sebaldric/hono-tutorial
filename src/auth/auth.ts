import { Hono } from "hono";

const app = new Hono();

app.get("/page", (c) => {
  return c.text("Hello Hono!");
});

export default app;
