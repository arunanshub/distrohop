import { getQuestion } from "./actions"
import AnswerCheckboxGroup from "./components/answer-checkbox-group"
import PreviousNextButtons from "./components/previous-next-buttons"

export default async function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params
  const question = await getQuestion(sectionId)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{question?.msgid}</h1>

      <AnswerCheckboxGroup question={question} />

      <PreviousNextButtons />
    </div>
  )
}
