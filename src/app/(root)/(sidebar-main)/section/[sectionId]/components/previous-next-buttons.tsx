"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function PreviousNextButtons() {
  return (
    <div className="mt-8 flex justify-between">
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          toast.info("Not implemented")
        }}
      >
        Previous
      </Button>
      <Button
        size="lg"
        onClick={() => {
          toast.info("Not implemented")
        }}
      >
        Next
      </Button>
    </div>
  )
}
