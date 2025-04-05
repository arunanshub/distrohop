"use client"
import Link from "next/link"
import { Question } from "./actions"
import { useSections } from "@/hooks/use-sections"
import { useAnswerStore } from "@/components/providers/answer-store-provider"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import AnswerRadioGroup from "@/components/answer-radio-group"
import { usePrevious } from "@uidotdev/usehooks"

export default function Client({
  question,
  sectionId,
}: {
  question: Question
  sectionId: string
}) {
  const { sections, addSelectedAnswer, removeSelectedAnswer, selectedAnswers } =
    useAnswerStore((store) => store)
  const { previous, next } = useSections(sections, sectionId)

  const [selectedAnswer, setSelectedAnswer] = useState<string>()
  const previousAnswer = usePrevious(selectedAnswer)

  useEffect(() => {
    // only one selected answer at a time
    if (selectedAnswer && !selectedAnswers.includes(selectedAnswer)) {
      addSelectedAnswer(selectedAnswer)
    }
    if (previousAnswer && selectedAnswers.includes(previousAnswer)) {
      removeSelectedAnswer(previousAnswer)
    }
  }, [
    selectedAnswer,
    addSelectedAnswer,
    selectedAnswers,
    removeSelectedAnswer,
    previousAnswer,
  ])

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">{question?.msgid}</h1>
        <p className="text-muted-foreground text-sm">
          {question?.additionalInfo}
        </p>
        <p>
          {question?.isMultipleChoice ? "Multiple Choice" : "Single Choice"}
        </p>
      </div>

      <pre>{JSON.stringify(selectedAnswers, null, 2)}</pre>

      <AnswerRadioGroup
        answers={question?.answers ?? []}
        onValueChange={(value) => setSelectedAnswer(value)}
      />

      <div className="flex w-full justify-end">
        <div className="flex gap-2">
          {previous && (
            <Button variant="outline" asChild>
              <Link href={`/section/${previous}`}>Previous</Link>
            </Button>
          )}
          {next && (
            <Button asChild>
              <Link href={`/section/${next}`}>Next</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
