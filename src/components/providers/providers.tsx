import { ThemeProvider } from "next-themes"
import TanstackQueryProvider from "./tanstack-query-provider"
import { AnswerStoreProvider } from "./answer-store-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackQueryProvider>
        <AnswerStoreProvider>{children}</AnswerStoreProvider>
      </TanstackQueryProvider>
    </ThemeProvider>
  )
}
