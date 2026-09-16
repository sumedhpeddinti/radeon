"use client"

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-sm text-gray-600 mb-6 max-w-md">
        An error occurred while loading this section.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
