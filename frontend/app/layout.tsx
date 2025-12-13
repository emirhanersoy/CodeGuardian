import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CodeGuardian - Security Code Analysis",
  description: "Detect JavaScript security vulnerabilities with CodeGuardian",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
