import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="w-full border-t p-4 text-sm tracking-tight">
      <div className="mx-auto flex h-4 max-w-6xl items-center justify-evenly gap-2 text-sm md:gap-0">
        <Link href="#">Imprint</Link>
        <Separator orientation="vertical" decorative />

        <Link href="#">Privacy</Link>
        <Separator orientation="vertical" decorative />

        <Link href="#">About</Link>
        <Separator orientation="vertical" decorative />

        <Link href="#">A project by @arunanshub</Link>
        <Separator orientation="vertical" decorative />

        <Link href="#">Github</Link>
      </div>
    </footer>
  )
}
