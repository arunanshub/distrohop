import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart,
  DollarSign,
  Cpu,
  FileQuestion,
  Home,
  ListChecks,
  Monitor,
  Terminal,
  ShieldCheck,
  Compass,
  Section,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaBoxOpen, FaMicrosoft, FaUserShield } from "react-icons/fa"
import { DiOpensource } from "react-icons/di"

function iconNameToIcon(iconName: string) {
  switch (iconName) {
    case "mdi:poll":
      return <BarChart />
    case "ic:round-monitor":
      return <Monitor />
    case "codicon:terminal-linux":
      return <Terminal />
    case "material-symbols:checklist-rtl":
      return <ListChecks />
    case "bi:gpu-card":
      return <Cpu />
    case "material-symbols:question-mark":
      return <FileQuestion />
    case "simple-icons:windows":
      return <FaMicrosoft />
    case "bi:currency-dollar":
      return <DollarSign />
    case "fa6-solid:box-open":
      return <FaBoxOpen />
    case "ri:open-source-fill":
      return <DiOpensource />
    case "mdi:shield-check":
      return <ShieldCheck />
    case "clarity:administrator-solid":
      return <FaUserShield />
    case "material-symbols:browser-updated":
      return <Compass />
    default:
      return <Section />
  }
}

export default async function Sidebar() {
  const sections: { msgid: string; iconName: string }[] = []

  return (
    <aside className="flex shrink-0 flex-col gap-2 border-r p-4 px-2 md:min-w-52 @lg/layout:px-4">
      {/* home button */}
      <Button asChild variant="secondary">
        <Link href="/" aria-label="Home">
          <Home />
          <span className="hidden @2xl/layout:block">Welcome!</span>
        </Link>
      </Button>

      <Separator />

      {/* the various sections */}
      <ScrollArea className="h-full">
        <nav className="flex max-h-[35svh] flex-col gap-2">
          {sections.map((section) => (
            <Button asChild key={section.msgid} variant="secondary">
              <Link
                href={`/section/${section.msgid}`}
                aria-label={section.msgid}
              >
                <div className="flex w-full items-center gap-2">
                  {iconNameToIcon(section.iconName)}
                  <span className="hidden @2xl/layout:block">
                    {section.msgid.slice(8, 26)}
                  </span>
                </div>
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <Separator />

      {/* show result button */}
      <Button aria-label="Show Results">
        <BarChart />
        <span className="hidden @2xl/layout:block">Show Results</span>
      </Button>
    </aside>
  )
}
