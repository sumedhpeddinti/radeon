"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
          <p className="text-base text-gray-600 mb-6 max-w-md">
            An unexpected error occurred while rendering this page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
