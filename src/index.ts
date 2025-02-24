import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { todos } from "./drizzle/schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { DrizzleD1Database } from "drizzle-orm/d1";

type Bindings = {
  DB: D1Database;
};

type Variables = {
  db: DrizzleD1Database;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middleware: drizzleのセットアップ
app.use("*", async (c, next) => {
  const db = drizzle(c.env.DB);
  c.set("db", db);
  await next();
});

// バリデーションスキーマ
const todoSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
});

// 全TODOの取得
app.get("/todos", async (c) => {
  const db = c.get("db");
  const items = await db.select().from(todos).all();
  return c.json(items);
});

// 新規TODO作成
app.post("/todos", zValidator("json", todoSchema), async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");

  const todo = await db
    .insert(todos)
    .values({
      id: crypto.randomUUID(),
      title: body.title,
      content: body.content,
      author: body.author,
    })
    .returning()
    .get();

  return c.json(todo, 201);
});

// 特定のTODOを取得
app.get("/todos/:id", async (c) => {
  const db = c.get("db");
  const id = c.req.param("id");

  const todo = await db.select().from(todos).where(eq(todos.id, id)).get();

  if (!todo) return c.json({ message: "Not found" }, 404);
  return c.json(todo);
});

// TODOの更新
app.put("/todos/:id", zValidator("json", todoSchema), async (c) => {
  const db = c.get("db");
  const id = c.req.param("id");
  const body = c.req.valid("json");

  const todo = await db
    .update(todos)
    .set(body)
    .where(eq(todos.id, id))
    .returning()
    .get();

  if (!todo) return c.json({ message: "Not found" }, 404);
  return c.json(todo);
});

// TODOの削除
app.delete("/todos/:id", async (c) => {
  const db = c.get("db");
  const id = c.req.param("id");

  await db.delete(todos).where(eq(todos.id, id)).run();

  return c.json({ message: "Deleted" }, 200);
});

export default app;
