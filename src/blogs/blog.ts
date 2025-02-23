import { Hono } from "hono";
import { blogPosts } from "../index"; // blogPostsをインポート
export const app = new Hono();

app.get("/", (c) => {
  return c.json({ posts: blogPosts });
});

app.get("/:id", (c) => {
  const { id } = c.req.param();
  const blogPost = blogPosts.find((post) => post.id === parseInt(id));
  if (!blogPost) {
    return c.json({ error: "Blog post not found" }, 404);
  }
  return c.json({ post: blogPost });
});

export default app;
