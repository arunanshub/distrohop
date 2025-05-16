export default function Layout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="@container/layout mx-auto flex w-full max-w-6xl border-x">
      {sidebar}
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}
