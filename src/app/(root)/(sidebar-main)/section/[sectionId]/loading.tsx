import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_OPTION_COUNT = 4

export default function SectionPageLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      {/* Title skeleton */}
      <Skeleton className="h-8 w-1/2" />

      {/* Answer options skeletons */}
      <div className="mt-4 space-y-4">
        {Array.from({ length: SKELETON_OPTION_COUNT }).map((_, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>

      {/* Navigation buttons skeleton matching page structure */}
      <div className="mt-8 flex w-full grow justify-between">
        {/* Reset button skeleton */}
        <Skeleton className="h-10 w-24 rounded-md" />

        {/* Previous/Next buttons skeleton */}
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </div>
  )
}
