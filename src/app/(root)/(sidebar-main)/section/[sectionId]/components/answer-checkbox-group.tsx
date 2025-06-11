"use client"
import { Answer, Question } from "../actions"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAnswerStore } from "@/providers/answer-store-provider"
import ConflictingAnswersList from "./conflicting-answers-list"
import { useAnswerStatus, useSelectedAnswer } from "@/hooks/answers"
import { useCurrentSectionStatus } from "@/hooks/sections"
import { useEffect } from "react"
import MarkAsImportantButton from "./mark-as-important-button"

export default function AnswerCheckboxGroup({
  question,
}: {
  question: Question
}) {
  const { selectedAnswer } = useSelectedAnswer(question)
  const { markSectionAsUnvisited, markSectionAsVisited } =
    useCurrentSectionStatus()

  // Mark section as unvisited when all checkboxes are unselected, meaning no
  // answer is selected from this question.
  useEffect(() => {
    if (selectedAnswer) {
      markSectionAsVisited()
    } else {
      markSectionAsUnvisited()
    }
  }, [selectedAnswer, markSectionAsUnvisited, markSectionAsVisited])

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

  const { isAnswerSelected } = useAnswerStatus(answer.msgid)

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

      {isAnswerSelected && <MarkAsImportantButton answer={answer} />}
    </div>
  )
}
