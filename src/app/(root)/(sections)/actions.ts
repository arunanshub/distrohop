"use server"

export async function getSections() {
  // mock data for now
  return Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    title: `Section ${i}`,
    description: `Section ${i} description`,
  }))
}

export async function submitAnswers(answers: string[]) {
  // mock data for now
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (Math.random() > 0.5) {
    throw new Error("Failed to submit answers")
  }
  return answers
}

export type Sections = Awaited<ReturnType<typeof getSections>>
