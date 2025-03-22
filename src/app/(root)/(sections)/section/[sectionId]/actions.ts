export async function getQuestion(sectionId: string) {
  // return mock for now
  return {
    id: sectionId,
    title: `Question ${sectionId}`,
    description: `This is the ${sectionId} question`,
  }
}

export type Question = Awaited<ReturnType<typeof getQuestion>>
