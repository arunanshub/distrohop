import { getQuestionBySection } from "@/lib/db/questions"

export async function getQuestion(sectionId: string) {
  return await getQuestionBySection(sectionId)
}

export type Question = Awaited<ReturnType<typeof getQuestion>>
