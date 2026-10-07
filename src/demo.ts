import { answerQuestion } from "./chat/answer.js";

const samples = [
  "How many casual leaves do I get each year?",
  "When are payslips available after salary processing?",
  "Can I carry forward unused casual leave?",
];

for (const question of samples) {
  const result = answerQuestion(question);
  console.log("\nQ:", question);
  console.log("confidence:", result.confidence, "handoff:", result.handoff);
  console.log(result.answer);
}
