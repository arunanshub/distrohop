"use server"

import { getSections as getSectionsFromDb } from "@/lib/db/sections"

export async function getSections() {
  return await getSectionsFromDb()
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
