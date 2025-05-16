import TanstackQueryProvider from "./tanstack-query-provider"
import { ThemeProvider } from "next-themes"

/**
 * Consolidates all providers into a single component.
 *
 * This is useful for avoiding the need to import and wrap each provider
 * in every file that needs them.
 */
export default function Providers({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  )
}
