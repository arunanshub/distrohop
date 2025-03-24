"use client"

import { type ReactNode, createContext, useContext, useMemo } from "react"
import { useStore } from "zustand"
import { type CounterStore, createCounterStore } from "@/stores/counter-store"

export type CounterStoreApi = ReturnType<typeof createCounterStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
)

export function CounterStoreProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => createCounterStore(), [])

  return (
    <CounterStoreContext.Provider value={store}>
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
