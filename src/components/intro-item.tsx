import React from "react"
import { cn } from "@/lib/utils"

type IntroItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  className?: string
  children: React.ReactNode
}

export function IntroItem({
  icon: IconComponent,
  className,
  children,
}: IntroItemProps) {
  // Use custom icon if provided, otherwise use the mapped icon based on iconName

  return (
    <li className={cn("flex items-center gap-2")}>
      <IconComponent className={cn("size-5 shrink-0", className)} />
      <span>{children}</span>
    </li>
  )
}
