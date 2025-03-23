"use client"
import Link from "next/link"
import { Sections, submitAnswers } from "./actions"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChartIcon, Home, Section } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useAnswerStore } from "@/components/providers/answer-store-provider"
import { toast } from "sonner"
import { useEffect, useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function ClientLayout({
  sections,
  children,
}: {
  sections: Sections
  children: React.ReactNode
}) {
  const router = useRouter()
  const { initAnswers, selectedAnswers } = useAnswerStore((state) => state)

  useEffect(() => {
    initAnswers(sections.map((section) => section.msgid))
  }, [initAnswers, sections])

  const toastId = useRef<string | number | null>(null)

  const mutation = useMutation({
    mutationFn: submitAnswers,
    onMutate: () => {
      toastId.current = toast.loading("Submitting answers", {
        description: "This may take a while...",
        richColors: true,
      })
    },
    onSuccess: () => {
      toast.success("Answers submitted successfully", { richColors: true })
      router.push("/results")
    },
    onError: () => {
      toast.error("Failed to submit answers", { richColors: true })
    },
    onSettled: () => {
      if (toastId.current) {
        toast.dismiss(toastId.current)
      }
      toastId.current = null
    },
  })

  function handleShowResult() {
    if (selectedAnswers.size === 0) {
      toast.error("No answers submitted", {
        richColors: true,
        description:
          "You must answer the questions before you can see the results",
      })
      return
    }
    mutation.mutate(Array.from(selectedAnswers))
  }

  return (
    <div className="flex h-full md:px-8">
      <div className="@container/layout mx-auto flex max-w-6xl grow border-r border-l">
        <aside className="flex flex-col gap-2 border-r p-4 px-2 md:w-52 @lg/layout:px-4">
          {/* home button */}
          <Button asChild variant="secondary" size="lg">
            <Link href="/">
              <Home />
              <span className="hidden @2xl/layout:block">Home</span>
            </Link>
          </Button>

          <Separator />

          {/* the various sections */}
          <ScrollArea className="h-full">
            <nav className="flex max-h-[35svh] flex-col gap-2">
              {sections.map((section) => (
                <Button
                  asChild
                  key={section.msgid}
                  variant="secondary"
                  size="lg"
                >
                  <Link href={`/section/${section.msgid}`}>
                    <Section />
                    <span className="hidden @2xl/layout:block">
                      {section.msgid.slice(8, 20)}
                    </span>
                  </Link>
                </Button>
              ))}
            </nav>
          </ScrollArea>

          <Separator />

          {/* show result button */}
          <Button size="lg" onClick={handleShowResult}>
            <BarChartIcon />
            <span className="hidden @2xl/layout:block">Show Results</span>
          </Button>
        </aside>

        {/* the questionnaire content */}
        <section className="grow p-4">{children}</section>
      </div>
    </div>
  )
}
