import { useMemo } from "react"

export function useSections(sections: string[], currentSection: string) {
  const previous = useMemo(() => {
    const index = sections.findIndex((section) => section === currentSection)
    if (index > 0) {
      return sections.at(index - 1)
    }
  }, [sections, currentSection])

  const next = useMemo(() => {
    const index = sections.findIndex((section) => section === currentSection)
    if (index < sections.length - 1) {
      return sections.at(index + 1)
    }
  }, [sections, currentSection])

  return {
    previous,
    next,
  }
}
