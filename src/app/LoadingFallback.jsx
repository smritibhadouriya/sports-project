const LoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-[#00698c]/30 border-t-[#00698c] rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
    </div>
  </div>
)

export default LoadingFallback
