import { Skeleton } from "@/components/ui/skeleton"

export default function SectionPageLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      {/* Title skeleton */}
      <Skeleton className="h-8 w-1/2" />

      {/* Answer options skeletons */}
      <div className="mt-4 space-y-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>

      {/* Navigation buttons skeleton */}
      <div className="mt-8 flex justify-between">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  )
}
