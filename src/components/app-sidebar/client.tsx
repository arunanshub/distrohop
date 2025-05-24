"use client"

import { use, useEffect } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { FaBoxOpen, FaMicrosoft, FaUserShield } from "react-icons/fa"
import {
  BarChart,
  Monitor,
  ListChecks,
  Cpu,
  FileQuestion,
  DollarSign,
  ShieldCheck,
  Compass,
  Section,
  Terminal,
} from "lucide-react"
import { DiOpensource } from "react-icons/di"
import { useSections } from "@/stores/section"

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

export default function AppSidebarClient({
  sectionsPromise,
}: {
  sectionsPromise: Promise<{ msgid: string; iconName: string }[]>
}) {
  const sections = use(sectionsPromise)
  const { addSections } = useSections(sections.map((section) => section.msgid))

  useEffect(() => {
    addSections(sections.map((section) => section.msgid))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {sections.map((section) => (
        <Button asChild key={section.msgid} variant="secondary">
          <Link href={`/section/${section.msgid}`} aria-label={section.msgid}>
            <div className="flex w-full items-center gap-2">
              {iconNameToIcon(section.iconName)}
              <span className="hidden @2xl/layout:block">
                {section.msgid.slice(8, 26)}
              </span>
            </div>
          </Link>
        </Button>
      ))}
    </>
  )
}
