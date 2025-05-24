"use client"

import { createSectionStore, SectionStore } from "@/stores/section"
import { createContext, useContext, useRef } from "react"
import { useStore } from "zustand"

type SectionStoreAPI = ReturnType<typeof createSectionStore>

const SectionStoreContext = createContext<SectionStoreAPI | undefined>(
  undefined,
)

export default function SectionStoreProvider({
  children,
}: {
  children: Readonly<React.ReactNode>
}) {
  const storeRef = useRef<SectionStoreAPI | undefined>(undefined)
  storeRef.current ??= createSectionStore()

  return (
    <SectionStoreContext.Provider value={storeRef.current}>
      {children}
    </SectionStoreContext.Provider>
  )
}

export function useSectionStore<T>(selector: (store: SectionStore) => T) {
  const store = useContext(SectionStoreContext)
  if (!store) {
    throw new Error("SectionStoreContext not found")
  }

  return useStore(store, selector)
}
