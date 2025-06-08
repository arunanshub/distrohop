import { Answer } from "../actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useConflictingAnswers } from "@/hooks/answers"

export default function ConflictingAnswersList({ answer }: { answer: Answer }) {
  const { conflictingAnswers } = useConflictingAnswers(answer)

  if (conflictingAnswers.length === 0) {
    return null
  }

  return (
    <Alert>
      <AlertCircle />
      <AlertTitle>Conflicting answers</AlertTitle>
      <AlertDescription className="pt-1">
        <ul className="flex list-disc flex-col gap-1 pl-3">
          {conflictingAnswers.map((ans) => (
            <li key={ans}>{ans}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
