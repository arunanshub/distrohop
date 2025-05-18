"use client"

import { Button } from "@/components/ui/button"
import { useSections } from "@/stores/section"
import { useRouter } from "next/navigation"

export default function PreviousNextButtons() {
  const { previousSection, nextSection } = useSections()
  const router = useRouter()

  return (
    <div className="mt-8 flex justify-between">
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
      <Button
        size="lg"
        onClick={() => {
          if (nextSection) {
            router.push(`/section/${nextSection}`)
          }
        }}
        disabled={!nextSection}
      >
        Next
      </Button>
    </div>
  )
}
