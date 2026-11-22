const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));

let posts = [
  {
    id: 1,
    title: "How do AND gates work?",
    author: "user1",
    topic: "Logic Gates",
  },
  { id: 2, title: "Verilog vs VHDL", author: "user2", topic: "Verilog / VHDL" },
];

app.get("/api/posts", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const paginatedPosts = posts.slice(start, start + limit);

  res.json({
    posts: paginatedPosts,
    totalPages: Math.ceil(posts.length / limit),
  });
});

app.post("/api/posts", (req, res) => {
  const { title, author, topic } = req.body;
  const newPost = { id: Date.now(), title, author, topic };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
