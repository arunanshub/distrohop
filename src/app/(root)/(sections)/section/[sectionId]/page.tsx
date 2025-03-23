import { getQuestion } from "./actions"
import Client from "./client"
import { unstable_cache as cache } from "next/cache"

const getCachedQuestion = cache(getQuestion, ["question"])

export default async function Page({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params
  const question = await getCachedQuestion(sectionId)
  return <Client question={question} />
}
