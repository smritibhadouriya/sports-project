import { memo } from 'react'

// GLOBAL SKELETON LOADER COMPONENT

const Skeleton = memo(({ className = '', rounded = 'md' }) => {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${roundedMap[rounded]} ${className}`}
    />
  )
})

Skeleton.displayName = 'Skeleton'

export const CardSkeleton = memo(() => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
    <Skeleton className="w-full h-40 mb-3" rounded="md" />
    <Skeleton className="w-3/4 h-4 mb-2" />
    <Skeleton className="w-full h-3 mb-1" />
    <Skeleton className="w-full h-3 mb-1" />
    <Skeleton className="w-2/3 h-3 mb-3" />
    <div className="flex justify-between">
      <Skeleton className="w-24 h-3" />
      <Skeleton className="w-16 h-3" />
    </div>
  </div>
))

export const MatchCardSkeleton = memo(() => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
    <Skeleton className="w-1/2 h-3 mb-3" />
    <div className="flex items-center gap-2 mb-2">
      <Skeleton className="w-6 h-6" rounded="full" />
      <Skeleton className="w-24 h-3" />
    </div>
    <div className="flex items-center gap-2">
      <Skeleton className="w-6 h-6" rounded="full" />
      <Skeleton className="w-24 h-3" />
    </div>
  </div>
))

export default Skeleton
