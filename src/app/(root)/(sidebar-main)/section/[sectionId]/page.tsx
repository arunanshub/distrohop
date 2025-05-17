import { getQuestion } from "./actions"
import SectionPageClient from "./client"

export default async function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params
  const question = await getQuestion(sectionId)

  return <SectionPageClient question={question} />
}
