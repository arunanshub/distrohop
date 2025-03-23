import { getSections } from "./actions"
import { CounterStoreProvider } from "@/components/providers/counter-store-provider"
import { AnswerStoreProvider } from "@/components/providers/answer-store-provider"
import ClientLayout from "./client-layout"
import { unstable_cache as cache } from "next/cache"

const getCachedSections = cache(getSections, ["sections"])

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sections = await getCachedSections()

  return (
    <CounterStoreProvider>
      <AnswerStoreProvider>
        <ClientLayout sections={sections}>{children}</ClientLayout>
      </AnswerStoreProvider>
    </CounterStoreProvider>
  )
}
