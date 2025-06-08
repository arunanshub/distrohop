import { createStore } from "zustand"

export type SectionStore = {
  sections: Map<string, boolean>
  addSections: (sectionIds: string[]) => void
  markAsVisited: (sectionId: string) => void
  unmarkAsVisited: (sectionId: string) => void
}

export function createSectionStore() {
  return createStore<SectionStore>()((set) => ({
    sections: new Map(),

    addSections: (sectionIds: string[]) => {
      return set(() => {
        const newMap = new Map()
        for (const sectionId of sectionIds) {
          // Initialize all sections as not visited
          newMap.set(sectionId, false)
        }
        return { sections: newMap }
      })
    },

    markAsVisited: (sectionId: string) => {
      set((state) => {
        const newMap = new Map(state.sections)
        if (newMap.has(sectionId)) {
          newMap.set(sectionId, true)
        }
        return { sections: newMap }
      })
    },

    unmarkAsVisited: (sectionId: string) => {
      set((state) => {
        const newMap = new Map(state.sections)
        if (newMap.has(sectionId)) {
          newMap.set(sectionId, false)
        }
        return { sections: newMap }
      })
    },
  }))
}
