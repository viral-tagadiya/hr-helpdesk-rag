import type { ChatAnswer } from "../types/index.js";
import { retrieve } from "./retrieve.js";

const HANDOFF_THRESHOLD = 0.35;

export function answerQuestion(question: string): ChatAnswer {
  const chunks = retrieve(question, 2);
  if (chunks.length === 0) {
    return {
      answer:
        "I could not find this in the help articles. I am routing you to a human support agent.",
      sources: [],
      confidence: 0,
      handoff: true,
    };
  }

  const top = chunks[0];
  const confidence = Math.min(1, top.score + chunks.length * 0.05);
  const handoff = confidence < HANDOFF_THRESHOLD;

  const sourceLines = chunks
    .map((c) => `- ${c.article.title} (${c.article.url})`)
    .join("\n");

  const answer = handoff
    ? `I found related articles but I am not confident enough to answer fully. Please check:\n${sourceLines}\nA human agent can confirm the exact rule for your case.`
    : `${top.excerpt}\n\nSources:\n${sourceLines}`;

  return {
    answer,
    sources: chunks.map((c) => ({
      id: c.article.id,
      title: c.article.title,
      url: c.article.url,
    })),
    confidence: Number(confidence.toFixed(2)),
    handoff,
  };
}
