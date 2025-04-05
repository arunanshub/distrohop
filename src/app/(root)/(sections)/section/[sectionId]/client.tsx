"use client"
import Link from "next/link"
import { Question } from "./actions"
import { useSections } from "@/hooks/use-sections"
import { useAnswerStore } from "@/components/providers/answer-store-provider"
import { Button } from "@/components/ui/button"
import AnswerRadioGroup from "@/components/answer-radio-group"
import useSelectedAnswer from "@/hooks/use-selected-answer"

export default function Client({
  question,
  sectionId,
}: {
  question: Question
  sectionId: string
}) {
  const answerStore = useAnswerStore((store) => store)
  const { previous, next } = useSections(answerStore.sections, sectionId)

  const { currentlySelectedAnswer } = useSelectedAnswer(
    question?.answers.map((answer) => answer.msgid) ?? [],
    answerStore.selectedAnswers,
  )

  function handleSelectedAnswer(answer: string) {
    // first remove the previously selected answer that is now replaced with a new answer
    if (currentlySelectedAnswer) {
      answerStore.removeSelectedAnswer(currentlySelectedAnswer)
    }
    // then select and add the new answer
    answerStore.addSelectedAnswer(answer)
  }

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

      <pre>{JSON.stringify(answerStore.selectedAnswers, null, 2)}</pre>

      <AnswerRadioGroup
        answers={question?.answers ?? []}
        onValueChange={(value) => handleSelectedAnswer(value)}
        selectedAnswer={currentlySelectedAnswer}
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
