import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
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

            <CardContent>Hello world</CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
