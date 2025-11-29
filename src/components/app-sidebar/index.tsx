import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import SidebarSections from "./sections"
import SidebarSkeleton from "./sidebar-skeleton"
import { Suspense } from "react"
import ResultsButton from "./results-button"
import { Section } from "@/actions/sections"

export default async function AppSidebar({
  sectionsPromise,
}: {
  sectionsPromise: Promise<Section[]>
}) {
  return (
    <aside className="flex shrink-0 flex-col gap-2 border-r p-4 px-2 md:min-w-58 @lg/layout:px-4">
      {/* home button */}
      <Button asChild variant="secondary">
        {/* since we don't have loading screen for root route, prefetch it for
          better performance */}
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center gap-2"
          prefetch
        >
          <Home />
          <span className="hidden @2xl/layout:block">Welcome!</span>
        </Link>
      </Button>

      <Separator />

      {/* the various sections */}
      <ScrollArea className="h-full">
        <nav className="flex max-h-[35svh] flex-col gap-2">
          <Suspense fallback={<SidebarSkeleton />}>
            <SidebarSections sectionsPromise={sectionsPromise} />
          </Suspense>
        </nav>
      </ScrollArea>

      <Separator />

      {/* show result button */}
      <ResultsButton className="@2xl/layout:block" />
    </aside>
  )
}
