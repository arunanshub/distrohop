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
import { cn } from "@/lib/utils"
import Image from "next/image"

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

  const questionHasMediaAnswers = question.answers.every(
    (answer) => answer.mediaSourcePath !== null,
  )

  if (questionHasMediaAnswers) {
    return (
      <ul className="flex flex-col items-center gap-4 @2xl/page:flex-row @2xl/page:justify-center">
        {question.answers.map((answer) => (
          <li key={answer.msgid} className="flex items-start gap-2">
            <AnswerCheckboxImage answer={answer} />
            <ConflictingAnswersList answer={answer} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {question.answers.map((answer) => (
        <li key={answer.msgid}>
          <div className="flex flex-col gap-2">
            <AnswerCheckbox answer={answer} />
            <ConflictingAnswersList answer={answer} />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Component for rendering an answer with a checkbox and an image.
 */
function AnswerCheckboxImage({ answer }: { answer: Answer }) {
  const addAnswer = useAnswerStore((store) => store.addAnswer)
  const removeAnswer = useAnswerStore((store) => store.removeAnswer)

  const { isAnswerSelected } = useAnswerStatus(answer.msgid)

  return (
    <div>
      <Label className="flex flex-col gap-1 text-base" htmlFor={answer.msgid}>
        <Image
          src={answer.mediaSourcePath!}
          alt={answer.msgid}
          width={400}
          height={400}
          priority
          className={cn(
            "h-auto w-auto border-4",
            isAnswerSelected ? "border-blue-500" : "border-transparent",
          )}
        />

        <Checkbox
          id={answer.msgid}
          checked={isAnswerSelected}
          hidden
          onCheckedChange={(val) => {
            if (val === true) {
              addAnswer(answer.msgid)
            } else {
              removeAnswer(answer.msgid)
            }
          }}
        />

        <span className="text-base">{answer.msgid}</span>

        <div className="h-5">
          {isAnswerSelected && <MarkAsImportantButton answer={answer} />}
        </div>
      </Label>
    </div>
  )
}

function AnswerCheckbox({ answer }: { answer: Answer }) {
  const addAnswer = useAnswerStore((store) => store.addAnswer)
  const removeAnswer = useAnswerStore((store) => store.removeAnswer)

  const { isAnswerSelected } = useAnswerStatus(answer.msgid)

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        answer.mediaSourcePath && "w-full flex-col",
      )}
    >
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
