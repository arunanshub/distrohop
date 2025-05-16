import type { Metadata } from "next"
import { Archivo, Artifika } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "Distrohop",
  description: "Distrohop",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${artifika.variable} ${archivo.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
