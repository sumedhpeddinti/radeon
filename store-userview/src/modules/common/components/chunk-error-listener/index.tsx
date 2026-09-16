"use client"

import { useEffect } from "react"

export default function ChunkErrorListener() {
  useEffect(() => {
    // Clear reload attempt flag after 5 seconds of successful execution
    const timer = setTimeout(() => {
      try {
        sessionStorage.removeItem("chunk_reload_attempted")
      } catch {}
    }, 5000)

    const triggerGuardedReload = () => {
      try {
        const hasAttempted = sessionStorage.getItem("chunk_reload_attempted")
        if (!hasAttempted) {
          sessionStorage.setItem("chunk_reload_attempted", "true")
          window.location.reload()
        }
      } catch {
        // Fallback if sessionStorage is disabled
      }
    }

    const handleWindowError = (event: ErrorEvent) => {
      const isChunkError =
        event?.message?.includes("Loading chunk") ||
        event?.message?.includes("ChunkLoadError") ||
        (event?.error && event?.error.name === "ChunkLoadError")

      if (isChunkError) {
        console.warn("ChunkLoadError detected. Triggering guarded page reload...")
        triggerGuardedReload()
      }
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason
      const isChunkError =
        reason?.name === "ChunkLoadError" ||
        reason?.message?.includes("Loading chunk") ||
        reason?.message?.includes("ChunkLoadError")

      if (isChunkError) {
        console.warn("ChunkLoadError rejection detected. Triggering guarded page reload...")
        triggerGuardedReload()
      }
    }

    window.addEventListener("error", handleWindowError)
    window.addEventListener("unhandledrejection", handleRejection)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("error", handleWindowError)
      window.removeEventListener("unhandledrejection", handleRejection)
    }
  }, [])

  return null
}
