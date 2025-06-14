import { SiLinux } from "@icons-pack/react-simple-icons"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-center border-b py-4 select-none">
      <h1 className="font-artifika text-4xl font-bold tracking-wide">
        <Link href="/" className="flex items-center gap-2" prefetch>
          <SiLinux className="size-16 md:size-28" color="default" />
          <span>Distrohop</span>
        </Link>
      </h1>
    </header>
  )
}
