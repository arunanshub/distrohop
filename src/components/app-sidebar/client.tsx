"use client"

import { useEffect } from "react"
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
import { useSectionStore } from "@/providers/section-store-provider"
import { useSectionStatus } from "@/hooks/sections"
import { cn } from "@/lib/utils"

function IconNameToIcon({ iconName }: { iconName: string }) {
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
  sections,
}: {
  sections: { msgid: string; iconName: string }[]
}) {
  const addSections = useSectionStore((store) => store.addSections)

  useEffect(() => {
    addSections(sections.map((section) => section.msgid))
  }, [addSections, sections])

  return (
    <>
      {sections.map((section) => (
        <SidebarButton key={section.msgid} section={section} />
      ))}
    </>
  )
}

function SidebarButton({
  section,
}: {
  section: { msgid: string; iconName: string }
}) {
  const { isSectionVisited } = useSectionStatus(section.msgid)

  return (
    <Button
      asChild
      variant="secondary"
      className={cn(
        "relative w-full min-w-13 transition-all duration-100",
        isSectionVisited && [
          "border-l-2 border-l-blue-500",
          "bg-blue-100 dark:bg-blue-900/40",
          "shadow-sm",
        ],
      )}
    >
      <Link href={`/section/${section.msgid}`} aria-label={section.msgid}>
        <div className="flex items-center gap-2">
          <IconNameToIcon iconName={section.iconName} />
          <span className="hidden @2xl/layout:block">
            {section.msgid.slice(8, 26)}
          </span>
        </div>
      </Link>
    </Button>
  )
}
