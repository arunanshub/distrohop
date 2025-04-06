import { getQuestion } from "./actions"
import Client from "./client"
import { unstable_cache as cache } from "next/cache"
import { notFound } from "next/navigation"

const getCachedQuestion = cache(getQuestion, ["question"])

export default async function Page({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params

  const question = await getCachedQuestion(sectionId)
  if (!question) {
    return notFound()
  }

  return <Client question={question} sectionId={sectionId} />
}
