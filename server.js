import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));

let subThreads = [
  {
    id: 1,
    superThreadId: 1,
    title: "How do AND gates work?",
    author: "user1",
    topic: "Logic Gates",
  },
  {
    id: 2,
    superThreadId: 1,
    title: "Verilog vs VHDL",
    author: "user2",
    topic: "Verilog / VHDL",
  },
];

let superthreads = [
  {
    id: 1,
    title: "Digital Logic & Gate Design",
    numSubThreads: 2,
  },
  {
    id: 2,
    title: "Sequential Circuits & Flip-Flops",
    numSubThreads: 0,
  },
];

app.get("/api/subthreads", (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const superThreadId = req.query.superThread
    ? parseInt(req.query.superThread, 10)
    : null;
  const start = (page - 1) * limit;

  const filteredSubThreads =
    superThreadId !== null
      ? subThreads.filter(
          (subThread) => subThread.superThreadId === superThreadId,
        )
      : [];
  const paginatedPosts = filteredSubThreads.slice(start, start + limit);

  res.json({
    subThreads: paginatedPosts,
    totalPages: Math.ceil(subThreads.length / limit),
  });
});

app.post("/api/subthreads", (req, res) => {
  const { title, superThreadId, author, topic } = req.body;
  const newPost = { id: Date.now(), superThreadId, title, author, topic };
  subThreads.unshift(newPost);
  res.status(201).json(newPost);
});

app.post("/api/superthreads", (req, res) => {
  const title = req.body.title;
  const newSuperThread = { id: Date.now(), title, subThreads: [] };
  subThreads.unshift(newSuperThread);
  res.status(201).json(newPost);
});

app.get("/api/superthreads", (req, res) => {
  res.json({ superthreads });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
