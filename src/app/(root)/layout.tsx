import Link from "next/link"
import { SiLinux } from "@icons-pack/react-simple-icons"

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

      <footer className="flex items-center justify-center border-t p-3 text-sm tracking-tight">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="#">Imprint</Link>
          </li>
          <li>
            <Link href="#">Privacy</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Github</Link>
          </li>
          <li>
            <Link href="#">A project by @arunanshub</Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}
