import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SectionNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Section not found</h1>
      <p className="text-muted-foreground text-sm">
        The section does not exist.
      </p>
      <Button asChild>
        <Link href="/">Go to home</Link>
      </Button>
    </div>
  )
}
