import GoToOther from "./go-to-other"
import { unstable_cache } from "next/cache"
import { Suspense } from "react"

type Data = {
  userId: number
  id: number
  title: string
  completed: boolean
}

async function showData(): Promise<Data> {
  "use server"
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json(),
  )
}

const showCachedData = unstable_cache(showData, undefined, {
  tags: ["test-data"],
})

export default function Home() {
  const data = showCachedData()

  return (
    <div className="flex flex-col gap-4">
      <h1>Dynamically loading data here:</h1>

      <main>
        <Suspense
          fallback={<div className="bg-amber-800">Loading data...</div>}
        >
          <DataPanel dataPromise={data} />
        </Suspense>
      </main>

      <GoToOther />
    </div>
  )
}

async function DataPanel({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = await dataPromise

  return (
    <div className="flex flex-col gap-2 rounded-xl border p-4">
      <h2>Data Panel</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
