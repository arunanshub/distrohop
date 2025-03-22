import { Loader2 } from "lucide-react"

export default function SectionLoading() {
  // TODO: turn it into a skeleton loader
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  )
}
