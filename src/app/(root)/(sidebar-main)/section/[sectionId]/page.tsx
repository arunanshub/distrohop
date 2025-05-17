import { getQuestion } from "./actions"

export default async function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params
  const question = await getQuestion(sectionId)

  return (
    <div>
      <h1>{question?.msgid}</h1>
      <div>
        {question?.answers.map((answer) => (
          <div key={answer.msgid}>{answer.msgid}</div>
        ))}
      </div>
    </div>
  )
}
