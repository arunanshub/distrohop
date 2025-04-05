import { getQuestion } from "./actions"
import Client from "./client"
// import { unstable_cache as cache } from "next/cache"

// const getCachedQuestion = cache(getQuestion, ["question"])

export default async function Page({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params
  const question = await getQuestion(sectionId)
  if (!question) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Question not found</h1>
        <p className="text-muted-foreground text-sm">
          The question you are looking for does not exist.
        </p>
      </div>
    )
  }
  return <Client question={question} sectionId={sectionId} />
}
