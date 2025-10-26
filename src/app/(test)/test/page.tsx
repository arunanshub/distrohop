import { Suspense } from "react"
import { getData } from "./actions"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading test data...</div>}>
      <Data />
    </Suspense>
  )
}

async function Data() {
  const x = await getData()

  return <div>Test page: {x.message}</div>
}
