import {
  Answer,
  Question,
} from "@/app/(root)/(sidebar-main)/section/[sectionId]/actions"
import { useAnswerStore } from "@/providers/answer-store-provider"
import { useMemo } from "react"

/**
 * Custom hook to get the status of an answer based on its msgid.
 * Status includes whether the answer is selected and if it is marked as important.
 *
 * @param msgid The message ID of the answer to check.
 * @returns An object containing the status of the answer:
 */
export function useAnswerStatus(msgid: string) {
  const answers = useAnswerStore((store) => store.answers)

  const isAnswerSelected = useMemo(() => answers.has(msgid), [answers, msgid])
  const isAnswerMarkedImportant = useMemo(
    () => answers.get(msgid) === true,
    [answers, msgid],
  )

  return {
    isAnswerSelected,
    isAnswerMarkedImportant,
  }
}

/**
 * Custom hook to get the selected answer based on the question provided.
 */
export function useSelectedAnswer(question: Question) {
  const answers = useAnswerStore((store) => store.answers)

  // which answer is currently selected
  const selectedAnswer = useMemo(
    () =>
      question.answers.find((answer) => answers.has(answer.msgid))?.msgid ||
      null,
    [answers, question.answers],
  )

  return { selectedAnswer }
}

/**
 * Get conflicting answers for a given answer based on the answers selected.
 *
 * @param answer The answer to check for conflicts.
 * @returns A list of conflicting answer's msgids.
 */
export function useConflictingAnswers(answer: Answer) {
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

  return { conflictingAnswers }
}
