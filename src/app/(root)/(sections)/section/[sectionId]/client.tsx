"use client"
import Link from "next/link"
import { Question } from "./actions"
import { useSections } from "@/hooks/use-sections"
import { useAnswerStore } from "@/components/providers/answer-store-provider"
import { Button } from "@/components/ui/button"
import RadioGroup from "@/components/answers/radio-group"
import CheckboxGroup from "@/components/answers/checkbox-group"

export default function Client({
  question,
  sectionId,
}: {
  question: Question
  sectionId: string
}) {
  const answerStore = useAnswerStore((store) => store)
  const { previous, next } = useSections(answerStore.sections, sectionId)

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

      <div className="font-mono">
        {JSON.stringify(answerStore.selectedAnswers, null, 2)}
      </div>

      {question?.isMultipleChoice ? (
        <CheckboxGroup answers={question?.answers ?? []} />
      ) : (
        <RadioGroup answers={question?.answers ?? []} />
      )}

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
