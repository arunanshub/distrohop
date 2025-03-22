import type { Metadata } from "next"
import { Artifika, Archivo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import TanstackQueryProvider from "@/components/providers/tanstack-query-provider"
import { Toaster } from "sonner"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const artifika = Artifika({
  variable: "--font-artifika",
  subsets: ["latin"],
  weight: "400",
})

const archivo = Archivo({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Distrohop",
  description: "Distrohop",
}

/**
 * This layout is only to manage any providers we may add. Any sort of
 * customization or data fetching must happen within other route groups.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TanstackQueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${artifika.variable} ${archivo.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Toaster />
          </ThemeProvider>

          <ReactQueryDevtools />
        </body>
      </html>
    </TanstackQueryProvider>
  )
}
