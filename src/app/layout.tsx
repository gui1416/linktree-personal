import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
 title: "Linktree - Guilherme Machado",
 description: "Meus links importantes em um só lugar",
 icons: {
  icon: [
   {
    url: "/favicon.png",
    sizes: "32x32",
    type: "image/png",
   },
   {
    url: "/favicon.png",
    sizes: "16x16",
    type: "image/png",
   },
  ],
  apple: [
   {
    url: "/favicon.png",
    sizes: "180x180",
    type: "image/png",
   },
  ],
 },
}

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode
}>) {
 return (
  <html lang="pt-BR" suppressHydrationWarning>
   <head>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
    <meta name="theme-color" content="#000000" />
   </head>
   <body className={inter.className}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
     {children}
    </ThemeProvider>
   </body>
  </html>
 )
}
