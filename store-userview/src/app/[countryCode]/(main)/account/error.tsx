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
    // If error is caused by a missing bundle chunk post-deployment, auto reload
    if (
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("ChunkLoadError")
    ) {
      console.warn("ChunkLoadError encountered in account route. Reloading page...")
      window.location.reload()
    }
  }, [error])

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
      <p className="text-sm text-gray-600 mb-6 max-w-md">
        An error occurred while loading this section. This usually happens when a new update has been deployed.
      </p>
      <button
        onClick={() => {
          if (
            error.name === "ChunkLoadError" ||
            error.message?.includes("Loading chunk")
          ) {
            window.location.reload()
          } else {
            reset()
          }
        }}
        className="px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Reload Page
      </button>
    </div>
  )
}
