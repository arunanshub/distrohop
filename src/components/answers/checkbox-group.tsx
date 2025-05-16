import AnswerCheckboxGroup from "@/components/answer-checkbox-group"
import { useAnswerStore } from "@/components/providers/answer-store-provider"
import useCheckedAnswer from "@/hooks/use-checked-answer"

type CheckboxGroupProps = {
  answers: {
    msgid: string
    mediaSourcePath: string | null
  }[]
}

export default function CheckboxGroup({ answers }: CheckboxGroupProps) {
  const answerStore = useAnswerStore((store) => store)
  const { uncheckedAnswers } = useCheckedAnswer({
    answers: answers.map((answer) => answer.msgid),
    selectedAnswers: answerStore.selectedAnswers,
  })

  function handleValueChange(value: string[]) {
    console.log(
      "handleValueChange",
      value,
      "uncheckedAnswers",
      uncheckedAnswers,
    )
  }

  return (
    <div>
      <AnswerCheckboxGroup
        answers={answers}
        onValueChange={handleValueChange}
      />
    </div>
  )
}
