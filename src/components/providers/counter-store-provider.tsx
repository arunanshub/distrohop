"use client"

import { type ReactNode, createContext, useRef, useContext } from "react"
import { useStore } from "zustand"
import { type CounterStore, createCounterStore } from "@/stores/counter-store"

export type CounterStoreApi = ReturnType<typeof createCounterStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
)

export function CounterStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<CounterStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCounterStore()
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export function useCounterStore<T>(selector: (store: CounterStore) => T): T {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error("useCounterStore must be used within CounterStoreProvider")
  }

  return useStore(counterStoreContext, selector)
}
