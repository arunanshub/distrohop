"use client"

import { BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useAnswerStore } from "@/providers/answer-store-provider"
import { submitAnswers as submitAnswersAction } from "@/actions/answers"
import { useRouter } from "next/navigation"

export default function ResultsButton() {
  const answers = useAnswerStore((state) => state.answers)
  const router = useRouter()

  const { mutate: submitAnswers } = useMutation({
    mutationFn: async () => await submitAnswersAction({ answers }),
  })

  function handleClick() {
    const id = toast.loading("Submitting answers...")
    // Prefetch the results page to improve performance
    router.prefetch("/results")

    submitAnswers(undefined, {
      onError(error) {
        toast.error("Failed to submit answers", {
          id,
          description: error instanceof Error ? error.message : "Unknown error",
        })
      },
      onSuccess() {
        toast.success("Answers submitted successfully", { id })
        router.push("/results")
      },
    })
  }

  return (
    <Button aria-label="Show Results" onClick={handleClick}>
      <BarChart />
      <span className="hidden @2xl/layout:block">Show Results</span>
    </Button>
  )
}
