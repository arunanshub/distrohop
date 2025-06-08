"use client"

import { Button } from "@/components/ui/button"
import { useResetAnswer } from "@/hooks/answers"
import { Question } from "../actions"

export default function AnswerResetButton({
  question,
}: {
  question: Question
}) {
  const { resetAnswers } = useResetAnswer(question)

  return (
    <Button variant="destructive" size="lg" onClick={resetAnswers}>
      Reset
    </Button>
  )
}
