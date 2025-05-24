"use client"
import { Button } from "@/components/ui/button"
import { Answer, Question } from "../actions"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAnswerStore } from "@/providers/answer-store-provider"
import { Star } from "lucide-react"
import ConflictingAnswersList from "./conflicting-answers-list"

export default function AnswerCheckboxGroup({
  question,
}: {
  question: Question
}) {
  return (
    <div className="flex flex-col gap-4">
      {question.answers.map((answer) => (
        <div key={answer.msgid} className="flex flex-col gap-2">
          <AnswerCheckbox answer={answer} />
          <ConflictingAnswersList answer={answer} />
        </div>
      ))}
    </div>
  )
}

function AnswerCheckbox({ answer }: { answer: Answer }) {
  const addSelectedAnswer = useAnswerStore((store) => store.addSelectedAnswer)
  const removeSelectedAnswer = useAnswerStore(
    (store) => store.removeSelectedAnswer,
  )
  const selectedAnswers = useAnswerStore((store) => store.selectedAnswers)

  const removeImportantAnswer = useAnswerStore(
    (store) => store.removeImportantAnswer,
  )
  const addImportantAnswer = useAnswerStore((store) => store.addImportantAnswer)
  const importantAnswers = useAnswerStore((store) => store.importantAnswers)

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={answer.msgid}
        className="size-6"
        checked={selectedAnswers.has(answer.msgid)}
        onCheckedChange={(val) => {
          if (val === true) {
            addSelectedAnswer(answer.msgid)
          } else {
            removeSelectedAnswer(answer.msgid)
            removeImportantAnswer(answer.msgid)
          }
        }}
      />
      <Label className="text-base" htmlFor={answer.msgid}>
        {answer.msgid}
      </Label>
      {selectedAnswers.has(answer.msgid) && (
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          asChild
          onClick={() => {
            if (importantAnswers.has(answer.msgid)) {
              removeImportantAnswer(answer.msgid)
            } else {
              addImportantAnswer(answer.msgid)
            }
          }}
        >
          {importantAnswers.has(answer.msgid) ? (
            <Star className="size-4 text-yellow-500" />
          ) : (
            <Star className="size-4 text-gray-500" />
          )}
        </Button>
      )}
    </div>
  )
}
