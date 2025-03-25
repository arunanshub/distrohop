"use client"
import Link from "next/link"
import { Question } from "./actions"
import { useSections } from "@/hooks/use-sections"
import { useParams } from "next/navigation"
import { useAnswerStore } from "@/components/providers/answer-store-provider"
import { Button } from "@/components/ui/button"

export default function Client({ question }: { question: Question }) {
  const { sectionId } = useParams<{ sectionId: string }>()
  const { sections } = useAnswerStore((store) => store)

  const { previous, next } = useSections(sections, sectionId)

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">{question?.msgid}</h1>
        <p className="text-muted-foreground text-sm">
          {question?.additionalInfo}
        </p>
      </div>

      <div>
        <ul>
          <li>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo,
            delectus?
          </li>
          <li>
            Dolores architecto corporis eius distinctio in eveniet voluptas
            eaque nulla.
          </li>
          <li>
            Placeat officia omnis voluptas perspiciatis libero illo, eius
            consectetur possimus.
          </li>
          <li>
            Nulla, molestiae quaerat rerum voluptas non veniam quidem dolores
            obcaecati?
          </li>
        </ul>
      </div>

      <div className="flex w-full justify-end">
        <div className="flex gap-2">
          {previous && (
            <Button variant="outline" asChild>
              <Link href={`/section/${previous}`}>Previous</Link>
            </Button>
          )}
          {next && (
            <Button asChild>
              <Link href={`/section/${next}`}>Next</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
