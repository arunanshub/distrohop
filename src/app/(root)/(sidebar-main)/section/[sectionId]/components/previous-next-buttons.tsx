"use client"

import ResultsButton from "@/components/app-sidebar/results-button"
import { Button } from "@/components/ui/button"
import { useSections } from "@/hooks/sections"
import { useRouter } from "next/navigation"

export default function PreviousNextButtons() {
  const router = useRouter()
  const { previousSection, nextSection } = useSections()

  return (
    <div className="flex flex-col gap-2 @md/layout:flex-row">
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          if (previousSection) {
            router.push(`/section/${previousSection}`)
          }
        }}
        disabled={!previousSection}
      >
        Previous
      </Button>
      {nextSection !== undefined ? (
        <Button
          size="lg"
          onClick={() => {
            router.push(`/section/${nextSection}`)
          }}
        >
          Next
        </Button>
      ) : (
        <ResultsButton className="block" />
      )}
    </div>
  )
}
