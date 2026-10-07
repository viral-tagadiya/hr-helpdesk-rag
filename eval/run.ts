import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { answerQuestion } from "../src/chat/answer.js";
import type { EvalTicket, TicketLabel } from "../src/types/index.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const tickets = JSON.parse(
  readFileSync(path.join(root, "tickets.json"), "utf8")
) as EvalTicket[];

function labelTicket(ticket: EvalTicket): {
  label: TicketLabel;
  result: ReturnType<typeof answerQuestion>;
} {
  const result = answerQuestion(ticket.question);
  const sourceIds = new Set(result.sources.map((s) => s.id));

  if (ticket.expectedArticleIds.length === 0) {
    const label: TicketLabel = result.handoff || result.sources.length === 0 ? "correct" : "wrong";
    return { label, result };
  }

  const hitExpected = ticket.expectedArticleIds.some((id) => sourceIds.has(id));
  const text = result.answer.toLowerCase();
  const hitFacts = ticket.mustInclude.every((m) => text.includes(m.toLowerCase()));

  let label: TicketLabel = "wrong";
  if (hitExpected && hitFacts && !result.handoff) label = "correct";
  else if (hitExpected || hitFacts) label = "partial";

  return { label, result };
}

const rows = tickets.map((ticket) => {
  const { label, result } = labelTicket(ticket);
  return {
    id: ticket.id,
    question: ticket.question,
    label,
    confidence: result.confidence,
    handoff: result.handoff,
    sources: result.sources.map((s) => s.id),
  };
});

const counts = rows.reduce(
  (acc, row) => {
    acc[row.label] += 1;
    return acc;
  },
  { correct: 0, partial: 0, wrong: 0 }
);

const report = {
  generatedAt: new Date().toISOString(),
  total: rows.length,
  counts,
  accuracy: Number((counts.correct / rows.length).toFixed(3)),
  rows,
};

writeFileSync(path.join(root, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.counts, null, 2));
console.log("accuracy:", report.accuracy);
console.log("wrote eval/report.json");
