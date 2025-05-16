import Footer from "@/components/footer"
import Header from "@/components/header"

export default function Layout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <div className="@container/layout mx-auto flex w-full max-w-6xl grow border-x">
        {sidebar}
        <div className="flex-1 p-4">{children}</div>
      </div>

      <Footer />
    </div>
  )
}
