import cors from "cors";
import express from "express";
import { loadArticles } from "./articles/store.js";
import { answerQuestion } from "./chat/answer.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "hr-helpdesk-rag" });
});

app.get("/articles", (_req, res) => {
  res.json(loadArticles());
});

app.post("/chat", (req, res) => {
  const question = String(req.body?.question ?? "").trim();
  if (!question) {
    res.status(400).json({ error: "question is required" });
    return;
  }
  res.json(answerQuestion(question));
});

const port = Number(process.env.PORT ?? 4050);
app.listen(port, () => {
  console.log(`hr-helpdesk-rag listening on http://localhost:${port}`);
});
