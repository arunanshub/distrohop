"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Answer, Question } from "../actions"
import { Label } from "@/components/ui/label"
import { useAnswerStore } from "@/providers/answer-store-provider"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import ConflictingAnswersList from "./conflicting-answers-list"

export default function AnswerRadioGroup({ question }: { question: Question }) {
  const selectedAnswers = useAnswerStore((store) => store.selectedAnswers)
  const addSelectedAnswer = useAnswerStore((store) => store.addSelectedAnswer)
  const removeSelectedAnswer = useAnswerStore(
    (store) => store.removeSelectedAnswer,
  )

  const removeImportantAnswer = useAnswerStore(
    (store) => store.removeImportantAnswer,
  )

  // Find the selected answer for this question by checking if any of the
  // possible answers is in the selectedAnswers set
  const selectedAnswer = useMemo(
    () =>
      question.answers.find((answer) => selectedAnswers.has(answer.msgid))
        ?.msgid,
    [question.answers, selectedAnswers],
  )

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        className="flex flex-col gap-3"
        value={selectedAnswer ?? null}
        onValueChange={(value) => {
          // If there's already a selected answer, remove it
          if (selectedAnswer) {
            removeSelectedAnswer(selectedAnswer)
            removeImportantAnswer(selectedAnswer)
          }
          // Add the new selection
          addSelectedAnswer(value)
        }}
      >
        {question.answers.map((answer) => (
          <div key={answer.msgid} className="flex flex-col gap-2">
            <AnswerRadio answer={answer} />
            <ConflictingAnswersList answer={answer} />
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

function AnswerRadio({ answer }: { answer: Answer }) {
  const selectedAnswers = useAnswerStore((store) => store.selectedAnswers)

  const addImportantAnswer = useAnswerStore((store) => store.addImportantAnswer)
  const removeImportantAnswer = useAnswerStore(
    (store) => store.removeImportantAnswer,
  )
  const importantAnswers = useAnswerStore((store) => store.importantAnswers)

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
