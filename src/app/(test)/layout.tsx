import Link from "next/link"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <header className="flex w-full items-center justify-center bg-gray-700 p-4">
        <Link href="/test" className="underline">
          Home
        </Link>
      </header>

      <main className="flex flex-1 flex-col p-4">{children}</main>
    </div>
  )
}
