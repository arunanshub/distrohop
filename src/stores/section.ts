import { createStore } from "zustand"

export type SectionStore = {
  sections: string[]
  addSections: (sectionIds: string[]) => void
}

export function createSectionStore() {
  return createStore<SectionStore>()((set) => ({
    sections: [],

    addSections: (sectionIds: string[]) =>
      set((state) => ({ sections: [...state.sections, ...sectionIds] })),
  }))
}
