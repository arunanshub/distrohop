"use client"

import { useSectionStore } from "@/providers/section-store-provider"
import { useParams } from "next/navigation"
import { useCallback, useMemo } from "react"

export function useSections() {
  const sections = useSectionStore((store) => store.sections)
  const currentSection = useParams().sectionId as string | undefined

  const nextSection = useMemo(() => {
    // If there are no sections, return undefined
    if (sections.size === 0) {
      return undefined
    }
    // no current section, meaning we are not in a sections page
    // hence we return the first section
    if (!currentSection) {
      return Array.from(sections.keys())[0]
    }

    const sectionsArray = Array.from(sections.keys())
    const idx = sectionsArray.indexOf(currentSection)
    if (idx === -1) {
      return sectionsArray[0]
    }
    if (idx === sectionsArray.length - 1) {
      return undefined
    }
    return sectionsArray[idx + 1]
  }, [sections, currentSection])

  const previousSection = useMemo(() => {
    // If we are not under /sections/<sectionId> route, previous section does
    // not make sense, hence undefined.
    if (!currentSection) {
      return undefined
    }

    const sectionsArray = Array.from(sections.keys())
    const idx = sectionsArray.indexOf(currentSection)
    if (idx > 0) {
      return sectionsArray[idx - 1]
    }
    return undefined
  }, [sections, currentSection])

  return { nextSection, previousSection }
}

/**
 * Hook to manage a section's visited status.
 *
 * It provides functions to check if the section is visited, mark it as visited,
 * and unmark it as visited.
 */
export function useSectionStatus(sectionId?: string) {
  const sections = useSectionStore((store) => store.sections)
  const sectionMarkAsVisited = useSectionStore((store) => store.markAsVisited)
  const sectionUnmarkAsVisited = useSectionStore(
    (store) => store.unmarkAsVisited,
  )

  const isSectionVisited = useMemo(() => {
    if (!sectionId) {
      return false
    }
    return sections.get(sectionId) ?? false
  }, [sections, sectionId])

  const markSectionAsVisited = useCallback(() => {
    if (!sectionId) {
      return
    }
    sectionMarkAsVisited(sectionId)
  }, [sectionId, sectionMarkAsVisited])

  const markSectionAsUnvisited = useCallback(() => {
    if (!sectionId) {
      return
    }
    sectionUnmarkAsVisited(sectionId)
  }, [sectionId, sectionUnmarkAsVisited])

  return { isSectionVisited, markSectionAsVisited, markSectionAsUnvisited }
}

/**
 * Helper hook to manage the current section's visited status.
 *
 * It provides functions to check if the section is visited, mark it as visited,
 * and unmark it as visited.
 */
export function useCurrentSectionStatus() {
  const sectionId = useParams().sectionId as string | undefined

  return useSectionStatus(sectionId)
}
