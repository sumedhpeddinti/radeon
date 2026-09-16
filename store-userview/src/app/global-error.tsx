"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("ChunkLoadError")
    ) {
      console.warn("Global ChunkLoadError caught. Auto reloading page...")
      window.location.reload()
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Application Updated</h2>
          <p className="text-base text-gray-600 mb-6 max-w-md">
            The application has been updated. Click below to refresh and load the latest version.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </body>
    </html>
  )
}
