"use client"

import { BarChart } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

export default function ResultsButton() {
  const router = useRouter()

  const { mutate: submitAnswers } = useMutation({
    mutationFn: async () => {
      // TODO: use a mutation to submit the answers and get the results.
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  function handleClick() {
    // TODO: use a mutation to submit the answers and get the results.
    submitAnswers()
    if (true) {
      toast.warning("Not implemented yet")
      return
    }
    router.push("/results")
  }

  return (
    <Button aria-label="Show Results" onClick={handleClick}>
      <BarChart />
      <span className="hidden @2xl/layout:block">Show Results</span>
    </Button>
  )
}
