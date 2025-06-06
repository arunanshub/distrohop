import type { Metadata } from "next"
import { Archivo, Artifika } from "next/font/google"
import "./globals.css"
import Providers from "@/providers/providers"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: {
    default: "Distrohop",
    template: "%s · Distrohop",
  },
  description: "Distrohop is a tool to help you choose a Linux distribution.",
  keywords: [
    "Linux",
    "Distro",
    "Distrochooser",
    "Distrohopping",
    "Choose a distro",
  ],
}

const artifika = Artifika({
  variable: "--font-artifika",
  subsets: ["latin"],
  weight: ["400"],
})

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
})

/**
 * This is the root layout for the app.
 *
 * Do NOT put any styling here. This layout is only for consolidating providers
 * and other essential stuff.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${artifika.variable} ${archivo.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}
