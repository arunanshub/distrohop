import { atom, useAtom } from "jotai"
import { useParams } from "next/navigation"
import { useMemo } from "react"

const sectionsAtom = atom<string[]>([])

export function useSections() {
  const [sections, setSections] = useAtom(sectionsAtom)

  const { sectionId } = useParams()
  const currentSection = sectionId as string

  function addSections(sectionIds: string[]) {
    setSections(sectionIds)
  }

  const nextSection = useMemo(() => {
    const currentIndex = sections.indexOf(currentSection)
    const nextIndex = currentIndex + 1
    if (nextIndex < sections.length) {
      return sections[nextIndex]
    }
  }, [sections, currentSection])

  const previousSection = useMemo(() => {
    const currentIndex = sections.indexOf(currentSection)
    const previousIndex = currentIndex - 1
    if (previousIndex >= 0) {
      return sections[previousIndex]
    }
  }, [sections, currentSection])

  return { sections, addSections, nextSection, previousSection }
}
