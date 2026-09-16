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
    console.error("Global Error caught:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Application Updated</h2>
          <p className="text-base text-gray-600 mb-6 max-w-md">
            The application has been updated with a new version. Please refresh to load the latest page.
          </p>
          <button
            onClick={() => {
              try {
                sessionStorage.removeItem("chunk_reload_attempted")
              } catch {}
              window.location.reload()
            }}
            className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </body>
    </html>
  )
}
