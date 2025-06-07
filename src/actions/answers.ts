"use server"

export async function submitAnswers({
  answers,
}: {
  answers: Map<string, boolean>
}) {
  // TODO: do some computation
  console.log("Submitting answers:", { answers })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { answer: 42 }
}
