import Footer from "@/components/footer"
import Header from "@/components/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      {/* the main content: can contain the sidebar or it can be a standalone
      page (eg, results or /info, /about etc.) */}
      <div className="flex flex-1">{children}</div>

      <Footer />
    </div>
  )
}
