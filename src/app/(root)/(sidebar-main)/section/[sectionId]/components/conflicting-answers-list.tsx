import { useMemo } from "react"
import { Answer } from "../actions"
import { useAnswerStore } from "@/providers/answer-store-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ConflictingAnswersList({ answer }: { answer: Answer }) {
  const selectedAnswers = useAnswerStore((store) => store.answers)

  const conflictingAnswers = useMemo(() => {
    if (!selectedAnswers.has(answer.msgid)) {
      return []
    }

    return answer.blockedBy
      .map((x) => x.answer.msgid)
      .concat(answer.blocks.map((x) => x.blockedBy.msgid))
      .filter((ans) => selectedAnswers.has(ans))
  }, [answer.blockedBy, answer.blocks, answer.msgid, selectedAnswers])

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
