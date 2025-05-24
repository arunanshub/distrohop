import { useMemo } from "react"
import { Answer } from "../actions"
import { useAnswerStore } from "@/providers/answer-store-provider"

export default function ConflictingAnswersList({ answer }: { answer: Answer }) {
  const selectedAnswers = useAnswerStore((store) => store.selectedAnswers)

  const conflictingAnswers = useMemo(() => {
    if (!selectedAnswers.has(answer.msgid)) {
      return []
    }

    return answer.blockedBy
      .map((x) => x.answer.msgid)
      .concat(answer.blocks.map((x) => x.blockedBy.msgid))
      .filter((ans) => selectedAnswers.has(ans))
  }, [answer.blockedBy, answer.blocks, answer.msgid, selectedAnswers])

  return (
    <div>
      {conflictingAnswers.map((ans) => (
        <div key={ans}>{ans}</div>
      ))}
    </div>
  )
}
