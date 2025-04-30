"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type AnswerCheckboxGroupProps = {
  answers: {
    msgid: string
    mediaSourcePath: string | null
  }[]
  onValueChange(value: string[]): void
}

export default function AnswerCheckboxGroup({
  answers,
  onValueChange,
}: AnswerCheckboxGroupProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  return (
    <div className="flex flex-col gap-2">
      {answers.map((answer) => (
        <div key={answer.msgid} className="flex items-center gap-2">
          <Checkbox
            className="size-6"
            id={answer.msgid}
            checked={selectedAnswers.includes(answer.msgid)}
            onCheckedChange={(checked) => {
              const newSelectedAnswers = checked
                ? [...selectedAnswers, answer.msgid]
                : selectedAnswers.filter((id) => id !== answer.msgid)

              setSelectedAnswers(newSelectedAnswers)
              onValueChange(newSelectedAnswers)
            }}
          />
          <Label htmlFor={answer.msgid} className="text-base">
            {answer.msgid}
          </Label>
        </div>
      ))}
    </div>
  )
}
