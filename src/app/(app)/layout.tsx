import Footer from "@/components/footer"
import Header from "@/components/header"

export default function Layout({
  sidebar,
  main,
}: {
  sidebar: React.ReactNode
  main: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <div className="mx-auto flex max-w-6xl flex-1 border-x">
        <div className="border-r">{sidebar}</div>
        <div className="grow">{main}</div>
      </div>

      <Footer />
    </div>
  )
}
