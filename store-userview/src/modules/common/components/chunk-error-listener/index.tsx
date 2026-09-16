"use client"

import { useEffect } from "react"

export default function ChunkErrorListener() {
  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      const isChunkError =
        event?.message?.includes("Loading chunk") ||
        event?.message?.includes("ChunkLoadError") ||
        (event?.error && event?.error.name === "ChunkLoadError")

      if (isChunkError) {
        console.warn(
          "ChunkLoadError detected due to new build deployment. Reloading page..."
        )
        window.location.reload()
      }
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason
      const isChunkError =
        reason?.name === "ChunkLoadError" ||
        reason?.message?.includes("Loading chunk") ||
        reason?.message?.includes("ChunkLoadError")

      if (isChunkError) {
        console.warn(
          "ChunkLoadError detected due to new build deployment. Reloading page..."
        )
        window.location.reload()
      }
    }

    window.addEventListener("error", handleWindowError)
    window.addEventListener("unhandledrejection", handleRejection)
    return () => {
      window.removeEventListener("error", handleWindowError)
      window.removeEventListener("unhandledrejection", handleRejection)
    }
  }, [])

  return null
}
