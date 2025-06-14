import { useAnswerStore } from "@/providers/answer-store-provider"
import { Answer } from "../actions"
import { useAnswerStatus } from "@/hooks/answers"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MarkAsImportantButton({ answer }: { answer: Answer }) {
  const markAsImportantAnswer = useAnswerStore(
    (store) => store.markAsImportantAnswer,
  )
  const unmarkAsImportantAnswer = useAnswerStore(
    (store) => store.unmarkAsImportantAnswer,
  )

  const { isAnswerMarkedImportant } = useAnswerStatus(answer.msgid)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-6"
      onClick={() => {
        if (isAnswerMarkedImportant) {
          unmarkAsImportantAnswer(answer.msgid)
        } else {
          markAsImportantAnswer(answer.msgid)
        }
      }}
    >
      <Star
        className={cn(
          "size-5",
          isAnswerMarkedImportant ? "text-yellow-500" : "text-gray-500",
        )}
      />
    </Button>
  )
}
