import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { Article } from "../types/index.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(root, "../../data/articles.json");

let cache: Article[] | null = null;

export function loadArticles(): Article[] {
  if (!cache) {
    cache = JSON.parse(readFileSync(dataPath, "utf8")) as Article[];
  }
  return cache;
}

export function getArticle(id: string): Article | undefined {
  return loadArticles().find((a) => a.id === id);
}
