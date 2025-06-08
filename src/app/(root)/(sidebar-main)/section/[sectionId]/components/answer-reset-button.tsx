"use client"

import { Button } from "@/components/ui/button"
import { useResetAnswer } from "@/hooks/answers"
import { Question } from "../actions"
import { useCurrentSectionStatus } from "@/hooks/sections"

export default function AnswerResetButton({
  question,
}: {
  question: Question
}) {
  const { resetAnswers } = useResetAnswer(question)
  const { markSectionAsUnvisited } = useCurrentSectionStatus()

  return (
    <Button
      variant="destructive"
      size="lg"
      onClick={() => {
        resetAnswers()
        markSectionAsUnvisited()
      }}
    >
      Reset
    </Button>
  )
}
