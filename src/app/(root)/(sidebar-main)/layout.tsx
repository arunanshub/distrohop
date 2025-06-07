import { getSections } from "@/actions/sections"
import AppSidebar from "@/components/app-sidebar"
import AnswerStoreProvider from "@/providers/answer-store-provider"
import SectionStoreProvider from "@/providers/section-store-provider"
import { Metadata } from "next"
import { unstable_cache as cache } from "next/cache"

export const metadata: Metadata = {
  title: "Welcome",
}

// Need to make the page dynamic since app-sidebar loads data from the server.
export const dynamic = "force-dynamic"

// cache the sections data for 1 hour
const getCachedSections = cache(getSections, undefined, {
  revalidate: 60 * 60, // 1 hour
})

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sectionsPromise = getCachedSections()

  return (
    <SectionStoreProvider>
      <AnswerStoreProvider>
        <div className="@container/layout mx-auto flex w-full max-w-6xl border-x">
          <AppSidebar sectionsPromise={sectionsPromise} />
          <div className="flex-1 p-4">{children}</div>
        </div>
      </AnswerStoreProvider>
    </SectionStoreProvider>
  )
}
