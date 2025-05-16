import { IntroItem } from "@/components/intro-item"
import { Button } from "@/components/ui/button"
import {
  Heart,
  HelpCircle,
  ListOrdered,
  SkipForward,
  Star,
  ThumbsUp,
  Trash2,
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome",
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold md:block">Welcome to Distrohop!</h1>
      <div>This test will help you choose a suitable Linux distribution.</div>

      <ul className="flex flex-col gap-2">
        <IntroItem
          icon={SkipForward}
          colorClass="text-amber-600 dark:text-amber-500"
        >
          You can always skip questions
        </IntroItem>
        <IntroItem
          icon={HelpCircle}
          colorClass="text-green-600 dark:text-green-500"
        >
          You can receive additional information using the question mark icon
        </IntroItem>
        <IntroItem
          icon={ThumbsUp}
          colorClass="text-yellow-500 dark:text-yellow-400"
        >
          You can always click on &apos;your recommendation&apos; to receive
          your result
        </IntroItem>
        <IntroItem
          icon={ListOrdered}
          colorClass="text-purple-600 dark:text-purple-500"
        >
          You may answer in arbitrary order
        </IntroItem>
        <IntroItem icon={Trash2} colorClass="text-gray-500 dark:text-gray-400">
          You can delete answers at any time
        </IntroItem>
        <IntroItem icon={Star} colorClass="text-blue-700 dark:text-blue-500">
          Mark answers as important to give them more weight
        </IntroItem>
        <IntroItem icon={Heart} colorClass="text-red-600 dark:text-red-500">
          Please rate your results, depending on how well they fit your needs
        </IntroItem>
      </ul>
      <div className="mt-4 flex flex-col">
        <Button className="self-end" size="lg">
          Start test
        </Button>
      </div>
    </div>
  )
}
