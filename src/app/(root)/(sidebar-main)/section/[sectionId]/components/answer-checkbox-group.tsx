"use client"
import { Question } from "../actions"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAnswerStore } from "@/providers/answer-store-provider"

export default function AnswerCheckboxGroup({
  question,
}: {
  question: Question
}) {
  const addSelectedAnswer = useAnswerStore((store) => store.addSelectedAnswer)
  const removeSelectedAnswer = useAnswerStore(
    (store) => store.removeSelectedAnswer,
  )
  const selectedAnswers = useAnswerStore((store) => store.selectedAnswers)

  return (
    <div className="flex flex-col gap-4">
      {question.answers.map((answer) => (
        <div key={answer.msgid} className="flex items-center gap-2">
          <Checkbox
            id={answer.msgid}
            className="size-6"
            checked={selectedAnswers.has(answer.msgid)}
            onCheckedChange={(val) => {
              if (val === true) {
                addSelectedAnswer(answer.msgid)
              } else {
                removeSelectedAnswer(answer.msgid)
              }
            }}
          />
          <Label className="text-base" htmlFor={answer.msgid}>
            {answer.msgid}
          </Label>
        </div>
      ))}
    </div>
  )
}
