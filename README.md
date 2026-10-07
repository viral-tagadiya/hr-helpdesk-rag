# HR Helpdesk RAG Assistant

Chat assistant for an HR product: answers leave, payroll, and policy questions from help articles, and always links the source page. Includes an offline evaluation set (~sample tickets) scored correct / partial / wrong.

## Stack

- Node.js + Express + TypeScript
- In-memory keyword retrieval over Markdown help articles (swap for embeddings later)
- Offline eval runner for prompt / chunk regressions

## Quick start

```bash
npm install
npm run demo
npm run eval
npm run dev   # API on http://localhost:4050
```

### API

- `GET /health`
- `GET /articles`
- `POST /chat` — `{ "question": "How many casual leaves do I get?" }`

## Eval

`eval/tickets.json` holds sample support tickets. `npm run eval` runs retrieval + answer drafting and writes `eval/report.json` with per-ticket labels and aggregate accuracy.

## Design notes

- Answers cite article ids; if confidence is low, response routes to human handoff.
- Retrieval is intentionally simple so the eval loop stays fast and deterministic without API keys.
