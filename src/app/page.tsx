import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <Mail />
    </div>
  )
}
