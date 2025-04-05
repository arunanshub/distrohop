import { useMemo } from "react"

export function useSections(sections: string[], currentSection: string) {
  const { previous, next } = useMemo(() => {
    const index = sections.findIndex((section) => section === currentSection)

    const previous = index > 0 ? sections.at(index - 1) : undefined
    const next =
      index < sections.length - 1 ? sections.at(index + 1) : undefined

    return {
      previous,
      next,
    }
  }, [sections, currentSection])

  return {
    previous,
    next,
  }
}
