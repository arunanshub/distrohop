import { cn } from "@/lib/utils"

export default function MarkdownLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "prose dark:prose-invert prose-code:after:content-none prose-code:before:content-none prose-code:font-mono max-w-none",
        className,
      )}
    >
      {children}
    </div>
  )
}
