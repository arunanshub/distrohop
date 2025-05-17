import { getSections } from "@/actions/sections"
import AppSidebar from "@/components/app-sidebar"

// Need to make the page dynamic since app-sidebar loads data from the server.
export const dynamic = "force-dynamic"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sectionsPromise = getSections()

  return (
    <div className="@container/layout mx-auto flex w-full max-w-6xl border-x">
      <AppSidebar sectionsPromise={sectionsPromise} />
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}
