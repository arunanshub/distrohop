import Link from "next/link"
import { SiLinux } from "@icons-pack/react-simple-icons"
import { Separator } from "@/components/ui/separator"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh flex-col">
      <header className="flex items-center justify-center border-b py-4 select-none">
        <h1 className="font-artifika text-4xl font-bold tracking-wide">
          <Link href="/" className="flex items-center gap-2">
            <SiLinux className="size-16 md:size-28" color="default" />
            <span>Distrohop</span>
          </Link>
        </h1>
      </header>

      <main className="grow">{children}</main>

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
    </div>
  )
}
