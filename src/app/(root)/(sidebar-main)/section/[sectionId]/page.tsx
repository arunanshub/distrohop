import { getQuestion } from "./actions"
import PreviousNextButtons from "./components/previous-next-buttons"
import dynamic from "next/dynamic"

const AnswerCheckboxGroup = dynamic(
  () => import("./components/answer-checkbox-group"),
)
const AnswerRadioGroup = dynamic(
  () => import("./components/answer-radio-group"),
)

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

      {question.isMultipleChoice ? (
        <AnswerCheckboxGroup question={question} />
      ) : (
        <AnswerRadioGroup question={question} />
      )}

      <PreviousNextButtons />
    </div>
  )
}
