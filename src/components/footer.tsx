import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="w-full border-t p-4 text-sm tracking-tight">
      <div className="mx-auto flex h-4 max-w-6xl items-center justify-evenly gap-2 text-sm md:gap-0">
        <Link href="/imprint" prefetch>
          Imprint
        </Link>
        <Separator orientation="vertical" decorative />

        <Link href="/privacy" prefetch>
          Privacy
        </Link>
        <Separator orientation="vertical" decorative />

        <Link href="/about">About</Link>
        <Separator orientation="vertical" decorative />

        <Link href="#">A project by @arunanshub</Link>
        <Separator orientation="vertical" decorative />

        <a
          href="https://github.com/arunanshub/distrohop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  )
}
