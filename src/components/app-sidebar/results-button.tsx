"use client"

import { BarChart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useIsMutating, useMutation } from "@tanstack/react-query"
import { useAnswerStore } from "@/providers/answer-store-provider"
import { submitAnswers as submitAnswersAction } from "@/actions/answers"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function ResultsButton({ className }: { className?: string }) {
  const answers = useAnswerStore((state) => state.answers)
  type Answers = typeof answers
  const router = useRouter()

  const { mutate: submitAnswers } = useMutation({
    mutationKey: ["submitAnswers"],
    mutationFn: async (answers: Answers) =>
      await submitAnswersAction({ answers }),
  })

  // to make sure the button is disabled while the answers are being submitted
  // even if the button is reused in the UI.
  const isPending = useIsMutating({ mutationKey: ["submitAnswers"] }) > 0

  function handleClick() {
    const id = toast.loading("Submitting answers...")
    // Prefetch the results page to improve performance
    router.prefetch("/results")

    submitAnswers(answers, {
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
    <Button
      aria-label={isPending ? "Showing Results..." : "Show Results"}
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <BarChart />}
      <span className={cn("hidden @2xl/layout:block", className)}>
        {isPending ? "Showing Results..." : "Show Results"}
      </span>
    </Button>
  )
}
