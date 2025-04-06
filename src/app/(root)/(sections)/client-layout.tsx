"use client"
import Link from "next/link"
import { Sections, submitAnswers } from "./actions"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart,
  Compass,
  Cpu,
  DollarSign,
  FileQuestion,
  Home,
  ListChecks,
  Loader2,
  Monitor,
  Section,
  ShieldCheck,
  Terminal,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useAnswerStore } from "@/components/providers/answer-store-provider"
import { toast } from "sonner"
import { useEffect, useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { FaBoxOpen, FaMicrosoft, FaUserShield } from "react-icons/fa"
import { DiOpensource } from "react-icons/di"

function iconNameToIcon(iconName: string) {
  switch (iconName) {
    case "mdi:poll":
      return <BarChart />
    case "ic:round-monitor":
      return <Monitor />
    case "codicon:terminal-linux":
      return <Terminal />
    case "material-symbols:checklist-rtl":
      return <ListChecks />
    case "bi:gpu-card":
      return <Cpu />
    case "material-symbols:question-mark":
      return <FileQuestion />
    case "simple-icons:windows":
      return <FaMicrosoft />
    case "bi:currency-dollar":
      return <DollarSign />
    case "fa6-solid:box-open":
      return <FaBoxOpen />
    case "ri:open-source-fill":
      return <DiOpensource />
    case "mdi:shield-check":
      return <ShieldCheck />
    case "clarity:administrator-solid":
      return <FaUserShield />
    case "material-symbols:browser-updated":
      return <Compass />
    default:
      return <Section />
  }
}

export default function ClientLayout({
  sections,
  children,
}: {
  sections: Sections
  children: React.ReactNode
}) {
  const router = useRouter()
  const { initSections } = useAnswerStore((state) => state)

  useEffect(() => {
    initSections(sections.map((section) => section.msgid))
  }, [initSections, sections])

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
    if (sections.length === 0) {
      toast.error("No sections submitted", {
        richColors: true,
        description:
          "You must answer the questions before you can see the results",
      })
      return
    }
    mutation.mutate(sections.map((section) => section.msgid))
  }

  return (
    <div className="flex h-full md:px-8">
      <div className="@container/layout mx-auto flex max-w-6xl grow border-r border-l">
        <aside className="flex flex-col gap-2 border-r p-4 px-2 md:min-w-52 @lg/layout:px-4">
          {/* home button */}
          <Button asChild variant="secondary">
            <Link href="/" aria-label="Home">
              <Home />
              <span className="hidden @2xl/layout:block">Welcome!</span>
            </Link>
          </Button>

          <Separator />

          {/* the various sections */}
          <ScrollArea className="h-full">
            <nav className="flex max-h-[35svh] flex-col gap-2">
              {sections.map((section) => (
                <Button asChild key={section.msgid} variant="secondary">
                  <Link
                    href={`/section/${section.msgid}`}
                    aria-label={section.msgid}
                  >
                    {iconNameToIcon(section.iconName)}
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
          <Button
            onClick={handleShowResult}
            disabled={mutation.isPending}
            aria-label="Show Results"
          >
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <BarChart />
            )}
            <span className="hidden @2xl/layout:block">Show Results</span>
          </Button>
        </aside>

        {/* the questionnaire content */}
        <section className="grow p-4">{children}</section>
      </div>
    </div>
  )
}
