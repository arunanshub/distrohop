import { getQuestion } from "./actions"
import Client from "./client"

export default async function Page({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params
  const question = await getQuestion(sectionId)
  return <Client question={question} />
}
