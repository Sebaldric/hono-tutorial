import { Hono } from "hono";
import blog from "./blogs/blog";
import auth from "./auth/auth";
import { basicAuth } from "hono/basic-auth";
export const app = new Hono();

// 認証設定を先に行う
app.use(
  "/auth/*",
  basicAuth({
    username: "hono",
    password: "acoolproject",
  })
);

// その後でルーティングを設定
app.route("/blog", blog);
app.route("/auth", auth);

export let blogPosts = [
  {
    id: 1,
    title: "My First Blog Post",
    content: "This is my first blog post",
    author: "John Doe",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 2,
    title: "My Second Blog Post",
    content: "This is my second blog post",
    author: "Jane Doe",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02",
  },
  {
    id: 3,
    title: "My Third Blog Post",
    content: "This is my third blog post",
    author: "John Doe",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
];

app.post("/posts", async (c) => {
  const { title, content, author } = await c.req.json<{
    title: string;
    content: string;
    author: string;
  }>();
  const newPost = {
    id: blogPosts.length + 1,
    title: title,
    content: content,
    author: author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  blogPosts.push(newPost);
  return c.json({ post: newPost }, 201);
});

app.put("/posts/:id", async (c) => {
  const { id } = c.req.param();
  const { title, content, author } = await c.req.json<{
    title: string;
    content: string;
    author: string;
  }>();
  const blogPost = blogPosts.find((post) => post.id === parseInt(id));
  if (!blogPost) {
    return c.json({ error: "Blog post not found" }, 404);
  }
  blogPost.title = title;
  blogPost.content = content;
  blogPost.author = author;
  blogPost.updatedAt = new Date().toISOString();
  return c.json({ post: blogPost }, 200);
});

app.delete("/posts/:id", (c) => {
  const { id } = c.req.param();
  const blogPost = blogPosts.find((post) => post.id === parseInt(id));
  if (!blogPost) {
    return c.json({ error: "Blog post not found" }, 404);
  }
  blogPosts = blogPosts.filter((post) => post.id !== parseInt(id));
  return c.json({ message: "Blog post deleted" }, 200);
});

export default app;
