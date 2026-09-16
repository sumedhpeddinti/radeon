"use client"

import { useEffect } from "react"

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Account Error caught:", error)
  }, [error])

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
      <p className="text-sm text-gray-600 mb-6 max-w-md">
        An update was recently deployed. Please click below to refresh the page.
      </p>
      <button
        onClick={() => {
          try {
            sessionStorage.removeItem("chunk_reload_attempted")
          } catch {}
          window.location.reload()
        }}
        className="px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Reload Page
      </button>
    </div>
  )
}
