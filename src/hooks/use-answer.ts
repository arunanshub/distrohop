import answerStore from "@/stores/answer"
import { useAtom } from "jotai"

export default function useAnswer() {
  const [count, setCount] = useAtom(answerStore.counterAtom)
  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)

  return { count, increment, decrement }
}
