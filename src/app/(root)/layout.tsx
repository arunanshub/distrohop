import Footer from "@/components/footer"
import Header from "@/components/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <div className="flex flex-1">{children}</div>

      <Footer />
    </div>
  )
}
