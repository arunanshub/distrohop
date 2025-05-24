"use client"

import { useSectionStore } from "@/providers/section-store-provider"
import { useParams } from "next/navigation"
import { useMemo } from "react"

export function useSections() {
  const sections = useSectionStore((store) => store.sections)
  const currentSection = useParams().sectionId as string | undefined

  const nextSection = useMemo(() => {
    if (sections.length === 0) {
      return undefined
    }
    if (!currentSection) {
      return sections[0]
    }
    const idx = sections.indexOf(currentSection)
    if (idx === -1) {
      return sections[0]
    }
    if (idx === sections.length - 1) {
      return undefined
    }
    return sections[idx + 1]
  }, [sections, currentSection])

  const previousSection = useMemo(() => {
    if (!currentSection) {
      return undefined
    }
    const idx = sections.indexOf(currentSection)
    if (idx > 0) {
      return sections[idx - 1]
    }
    return undefined
  }, [sections, currentSection])

  return { nextSection, previousSection }
}
