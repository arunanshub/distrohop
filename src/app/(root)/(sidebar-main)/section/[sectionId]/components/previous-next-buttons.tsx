"use client"

import { Button } from "@/components/ui/button"
import { useSections } from "@/hooks/sections"
import { useRouter } from "next/navigation"

export default function PreviousNextButtons() {
  const router = useRouter()
  const { previousSection, nextSection } = useSections()

  return (
    <div className="flex gap-4">
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
