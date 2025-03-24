"use client"
import { AnswerStore, createAnswerStore } from "@/stores/answer-store"
import { createContext, useContext, useMemo } from "react"
import { ReactNode } from "react"
import { useStore } from "zustand"

type AnswerStoreApi = ReturnType<typeof createAnswerStore>

const AnswerStoreContext = createContext<AnswerStoreApi | undefined>(undefined)

export function AnswerStoreProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => createAnswerStore(), [])

  return (
    <AnswerStoreContext.Provider value={store}>
      {children}
    </AnswerStoreContext.Provider>
  )
}

export function useAnswerStore<T>(selector: (store: AnswerStore) => T): T {
  const answerStoreContext = useContext(AnswerStoreContext)

  if (!answerStoreContext) {
    throw new Error("useAnswerStore must be used within AnswerStoreProvider")
  }

  return useStore(answerStoreContext, selector)
}
