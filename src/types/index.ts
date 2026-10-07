export type Article = {
  id: string;
  title: string;
  url: string;
  tags: string[];
  body: string;
};

export type RetrievedChunk = {
  article: Article;
  score: number;
  excerpt: string;
};

export type ChatAnswer = {
  answer: string;
  sources: Array<{ id: string; title: string; url: string }>;
  confidence: number;
  handoff: boolean;
};

export type TicketLabel = "correct" | "partial" | "wrong";

export type EvalTicket = {
  id: string;
  question: string;
  expectedArticleIds: string[];
  mustInclude: string[];
};
