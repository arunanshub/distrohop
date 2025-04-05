import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type AnswerRadioGroupProps = {
  answers: {
    msgid: string
    mediaSourcePath: string | null
  }[]
  onValueChange: (value: string) => void
  selectedAnswer: string | undefined
}

export default function AnswerRadioGroup({
  answers,
  onValueChange,
  selectedAnswer,
}: AnswerRadioGroupProps) {
  return (
    <RadioGroup onValueChange={onValueChange}>
      {answers.map((answer) => (
        <div key={answer.msgid} className="flex items-center gap-2">
          <RadioGroupItem
            value={answer.msgid}
            id={answer.msgid}
            className="size-6"
            checked={selectedAnswer === answer.msgid}
          />
          <Label htmlFor={answer.msgid} className="text-md">
            {answer.msgid}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
