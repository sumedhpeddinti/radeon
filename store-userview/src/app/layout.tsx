import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Radeon Store",
    template: "%s | Radeon Store",
  },
  description: "Official Radeon Storefront",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-icon.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo-icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/logo-icon.png" },
    ],
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
