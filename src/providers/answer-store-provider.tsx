"use client"

import { AnswerStore, createAnswerStore } from "@/stores/answer"
import { createContext, useContext, useRef } from "react"
import { useStore } from "zustand"

type AnswerStoreAPI = ReturnType<typeof createAnswerStore>

const AnswerStoreContext = createContext<AnswerStoreAPI | undefined>(undefined)

export default function AnswerStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const answerRef = useRef<AnswerStoreAPI | undefined>(undefined)
  answerRef.current ??= createAnswerStore()

  return (
    <AnswerStoreContext.Provider value={answerRef.current}>
      {children}
    </AnswerStoreContext.Provider>
  )
}

export function useAnswerStore<T>(selector: (store: AnswerStore) => T) {
  const store = useContext(AnswerStoreContext)
  if (!store) {
    throw new Error("AnswerStoreContext not found")
  }

  return useStore(store, selector)
}
