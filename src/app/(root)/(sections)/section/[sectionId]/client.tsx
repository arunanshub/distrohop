"use client"
import { useCounterStore } from "@/components/providers/counter-store-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Question } from "./actions"

export default function Client({ question }: { question: Question }) {
  const { count, decrementCount, incrementCount } = useCounterStore(
    (state) => state,
  )

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">{question.title}</h1>
        <p className="text-muted-foreground text-sm">{question.description}</p>
      </div>

      <div className="flex items-center gap-2">
        <p>Count: {count}</p>
        <Button onClick={decrementCount}>Decrement</Button>
        <Button onClick={incrementCount}>Increment</Button>
      </div>

      <Link href="/">Back to sections</Link>
    </div>
  )
}
