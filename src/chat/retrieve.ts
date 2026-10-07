import type { Article, RetrievedChunk } from "../types/index.js";
import { loadArticles } from "../articles/store.js";

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

export function retrieve(question: string, limit = 3): RetrievedChunk[] {
  const qTokens = new Set(tokens(question));
  const scored = loadArticles().map((article) => {
    const hay = tokens(`${article.title} ${article.tags.join(" ")} ${article.body}`);
    let overlap = 0;
    for (const t of hay) {
      if (qTokens.has(t)) overlap += 1;
    }
    const score = overlap / Math.max(qTokens.size, 1);
    const excerpt = article.body.slice(0, 180) + (article.body.length > 180 ? "…" : "");
    return { article, score, excerpt } satisfies RetrievedChunk;
  });

  return scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function articlesByIds(ids: string[]): Article[] {
  const all = loadArticles();
  return ids.map((id) => all.find((a) => a.id === id)).filter(Boolean) as Article[];
}
