import { getSections } from "@/actions/sections"
import AppSidebar from "@/components/app-sidebar"
import AnswerStoreProvider from "@/providers/answer-store-provider"
import SectionStoreProvider from "@/providers/section-store-provider"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome",
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sectionsPromise = getSections()

  return (
    <SectionStoreProvider>
      <AnswerStoreProvider>
        <div className="@container/layout mx-auto flex w-full max-w-6xl border-x">
          <AppSidebar sectionsPromise={sectionsPromise} />
          <div className="@container/page flex-1 p-4">{children}</div>
        </div>
      </AnswerStoreProvider>
    </SectionStoreProvider>
  )
}
