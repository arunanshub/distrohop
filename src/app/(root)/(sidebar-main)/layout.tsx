import AppSidebar from "@/components/app-sidebar"

// Need to make the page dynamic since app-sidebar loads data from the server.
export const dynamic = "force-dynamic"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container/layout mx-auto flex w-full max-w-6xl border-x">
      <AppSidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}
