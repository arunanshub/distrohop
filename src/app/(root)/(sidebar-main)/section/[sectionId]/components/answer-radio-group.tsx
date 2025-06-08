"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Answer, Question } from "../actions"
import { Label } from "@/components/ui/label"
import { useAnswerStore } from "@/providers/answer-store-provider"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import ConflictingAnswersList from "./conflicting-answers-list"
import { cn } from "@/lib/utils"
import { useAnswerStatus, useSelectedAnswer } from "@/hooks/answers"

export default function AnswerRadioGroup({ question }: { question: Question }) {
  const addAnswer = useAnswerStore((store) => store.addAnswer)
  const removeAnswer = useAnswerStore((store) => store.removeAnswer)

  // which answer is currently selected
  const { selectedAnswer } = useSelectedAnswer(question)

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        className="flex flex-col gap-3"
        value={selectedAnswer}
        onValueChange={(value) => {
          if (value) {
            for (const answer of question.answers) {
              removeAnswer(answer.msgid)
            }
            addAnswer(value)
          }
        }}
      >
        {question.answers.map((answer) => (
          <div key={answer.msgid}>
            <div className="flex flex-col gap-2">
              <AnswerRadio answer={answer} />
              <ConflictingAnswersList answer={answer} />
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

function AnswerRadio({ answer }: { answer: Answer }) {
  const markAsImportantAnswer = useAnswerStore(
    (store) => store.markAsImportantAnswer,
  )
  const unmarkAsImportantAnswer = useAnswerStore(
    (store) => store.unmarkAsImportantAnswer,
  )

  const { isAnswerSelected, isAnswerMarkedImportant } = useAnswerStatus(
    answer.msgid,
  )

  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem
        id={answer.msgid}
        value={answer.msgid}
        className="size-7"
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
