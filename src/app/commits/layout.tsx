import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Últimos Commits - Guilherme Machado",
  description: "Acompanhe minhas contribuições mais recentes em projetos de código aberto no GitHub.",
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

export default function AtualizacoesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-gradient-to-br from-background to-muted overflow-x-hidden">{children}</div>
}
