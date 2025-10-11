import MdLayout from "@/components/markdown/markdown-layout"

export default function MarkdownLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MdLayout className="mx-auto w-full max-w-4xl p-4">{children}</MdLayout>
  )
}
