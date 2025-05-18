"use client"
import { Button } from "@/components/ui/button"
import { useSections } from "@/stores/section"
import { useRouter } from "next/navigation"

export default function StartTestButton() {
  const { nextSection } = useSections()
  const router = useRouter()

  return (
    <div className="mt-4 flex flex-col">
      <Button
        className="self-end"
        size="lg"
        disabled={!nextSection}
        onClick={() => router.push(`/section/${nextSection}`)}
      >
        Start test
      </Button>
    </div>
  )
}
