import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function SidebarSkeleton() {
  // Create an array of 3 items to match the number of sections in the real data
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Button
          key={index}
          variant="secondary"
          disabled
          className="w-full cursor-default"
        >
          <div className="flex w-full items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0" />
            <Skeleton className="hidden h-4 w-full max-w-[100px] @2xl/layout:block" />
          </div>
        </Button>
      ))}
    </>
  )
}
