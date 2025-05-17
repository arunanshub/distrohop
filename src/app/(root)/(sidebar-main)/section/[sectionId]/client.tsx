"use client"

import { toast } from "sonner"
import { Question } from "./actions"
import { Button } from "@/components/ui/button"

export default function SectionPageClient({
  question,
}: {
  question: Question
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{question?.msgid}</h1>

      <div className="mb-8">
        <div className="flex flex-col gap-4">
          {question?.answers.map((answer) => (
            <div
              key={answer.msgid}
              className="border-border hover:bg-secondary/10 flex items-start space-x-2 rounded-md border p-3"
            >
              {/* Radio placeholder - will be fully implemented later */}
              <div className="border-primary/30 mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2"></div>
              <div className="flex-1">
                <p className="font-medium">{answer.msgid}</p>
                {/* Answer description would go here if available */}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              toast.info("Not implemented")
            }}
          >
            Previous
          </Button>
          <Button
            size="lg"
            onClick={() => {
              toast.info("Not implemented")
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
