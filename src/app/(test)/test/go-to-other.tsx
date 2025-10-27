"use client"

import { useRouter } from "next/navigation"

export default function GoToOther() {
  const router = useRouter()

  function goToOther() {
    router.prefetch("/other")
    router.push("/other")
  }

  return (
    <div>
      <button onClick={goToOther} className="cursor-pointer underline">
        Go to other page
      </button>
    </div>
  )
}
