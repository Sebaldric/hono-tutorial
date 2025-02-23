import { Hono } from "hono";

const app = new Hono();

let blogPosts = [
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

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/blog-posts", (c) => {
  return c.json({ posts: blogPosts });
});

app.get("/blog-posts/:id", (c) => {
  const { id } = c.req.param();
  const blogPost = blogPosts.find((post) => post.id === parseInt(id));
  if (!blogPost) {
    return c.json({ error: "Blog post not found" }, 404);
  }
  return c.json({ post: blogPost });
});

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
  return c.json({ post: blogPost });
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
