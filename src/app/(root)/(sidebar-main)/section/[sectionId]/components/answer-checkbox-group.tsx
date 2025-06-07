"use client"
import { Button } from "@/components/ui/button"
import { Answer, Question } from "../actions"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAnswerStore } from "@/providers/answer-store-provider"
import { Star } from "lucide-react"
import ConflictingAnswersList from "./conflicting-answers-list"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

export default function AnswerCheckboxGroup({
  question,
}: {
  question: Question
}) {
  return (
    <div className="flex flex-col gap-4">
      {question.answers.map((answer) => (
        <div key={answer.msgid}>
          <div className="flex flex-col gap-2">
            <AnswerCheckbox answer={answer} />
            <ConflictingAnswersList answer={answer} />
          </div>
        </div>
      ))}
    </div>
  )
}

function AnswerCheckbox({ answer }: { answer: Answer }) {
  const addAnswer = useAnswerStore((store) => store.addAnswer)
  const removeAnswer = useAnswerStore((store) => store.removeAnswer)
  const answers = useAnswerStore((store) => store.answers)

  const markAsImportantAnswer = useAnswerStore(
    (store) => store.markAsImportantAnswer,
  )
  const unmarkAsImportantAnswer = useAnswerStore(
    (store) => store.unmarkAsImportantAnswer,
  )

  const isAnswerSelected = useMemo(
    () => answers.has(answer.msgid),
    [answers, answer.msgid],
  )
  const isAnswerMarkedImportant = useMemo(
    () => answers.get(answer.msgid) === true,
    [answers, answer.msgid],
  )

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={answer.msgid}
        className="size-6"
        checked={isAnswerSelected}
        onCheckedChange={(val) => {
          if (val === true) {
            addAnswer(answer.msgid)
          } else {
            removeAnswer(answer.msgid)
          }
        }}
      />
      <Label className="text-base" htmlFor={answer.msgid}>
        {answer.msgid}
      </Label>
      {isAnswerSelected && (
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          onClick={() => {
            if (isAnswerMarkedImportant) {
              unmarkAsImportantAnswer(answer.msgid)
            } else {
              markAsImportantAnswer(answer.msgid)
            }
          }}
        >
          <Star
            className={cn(
              "size-5",
              isAnswerMarkedImportant ? "text-yellow-500" : "text-gray-500",
            )}
          />
        </Button>
      )}
    </div>
  )
}
