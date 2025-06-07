"use server"

export async function submitAnswers({
  selectedAnswers,
  importantAnswers,
}: {
  selectedAnswers: Set<string>
  importantAnswers: Set<string>
}) {
  // TODO: do some computation
  console.log("Submitting answers:", {
    selectedAnswers: Array.from(selectedAnswers),
    importantAnswers: Array.from(importantAnswers),
  })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { answer: 42 }
}
