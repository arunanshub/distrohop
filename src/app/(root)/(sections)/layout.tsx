import { getSections } from "./actions"
import { CounterStoreProvider } from "@/components/providers/counter-store-provider"
import { AnswerStoreProvider } from "@/components/providers/answer-store-provider"
import ClientLayout from "./client-layout"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sections = await getSections()

  return (
    <CounterStoreProvider>
      <AnswerStoreProvider>
        <ClientLayout sections={sections}>{children}</ClientLayout>
      </AnswerStoreProvider>
    </CounterStoreProvider>
  )
}
