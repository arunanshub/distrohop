import TanstackQueryProvider from "./tanstack-query-provider"

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
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>
}
