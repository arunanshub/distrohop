import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Results",
  description: "Results page",
}

export default async function ResultsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 border-x p-6">
      <h1 className="text-4xl font-bold">Results</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Distro {i}</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul>
                <li>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quae, fugit?
                  </p>
                </li>
                <li>
                  <p>
                    Maxime vel quasi molestias alias numquam adipisci esse
                    ducimus doloribus!
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
