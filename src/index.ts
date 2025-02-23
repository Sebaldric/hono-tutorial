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
  return c.json({ post: blogPost });
});

export default app;
