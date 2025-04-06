import { getQuestionBySection } from "@/lib/db/questions"
import { notFound } from "next/navigation"
import { DatabaseError } from "pg"

export async function getQuestion(sectionId: string) {
  try {
    return await getQuestionBySection(sectionId)
  } catch (error) {
    if (error instanceof DatabaseError && error.code === "P0002") {
      return notFound()
    }
    throw error
  }
}

export type Question = Awaited<ReturnType<typeof getQuestion>>
