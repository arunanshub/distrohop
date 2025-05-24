"use client"

import { atom, useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { useParams } from "next/navigation"
import { useCallback, useMemo } from "react"

const sectionsAtom = atom<string[]>([])

export function useSections(sectionIds?: string[]) {
  // VERY IMPORTANT: not adding this will cause a hydration error on the client.
  useHydrateAtoms([[sectionsAtom, sectionIds ?? []]])
  const [sections, setSections] = useAtom(sectionsAtom)

  const sectionId = useParams().sectionId as string
  const currentSection = useMemo(
    () => sections.find((s) => s === sectionId),
    [sections, sectionId],
  )

  const addSections = useCallback(
    (sectionIds: string[]) => {
      setSections(sectionIds)
    },
    [setSections],
  )

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

  return { sections, addSections, nextSection, previousSection }
}
