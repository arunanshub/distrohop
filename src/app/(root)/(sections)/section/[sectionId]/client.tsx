"use client"
import Link from "next/link"
import { Question } from "./actions"
import { useSections } from "@/hooks/use-sections"
import { useAnswerStore } from "@/components/providers/answer-store-provider"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import * as v from "valibot"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { useEffect } from "react"

export default function Client({
  question,
  sectionId,
}: {
  question: Question
  sectionId: string
}) {
  const { sections, addSelectedAnswer, removeSelectedAnswer, selectedAnswers } = useAnswerStore(
    (store) => store,
  )
  const { previous, next } = useSections(sections, sectionId)

  // build a dynamic form schema based on the question type
  const formSchema = v.object({
    option: v.picklist(question?.answers.map((answer) => answer.msgid) ?? []),
  })
  type FormSchema = v.InferOutput<typeof formSchema>
  const form = useForm<FormSchema>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      option: "",
    },
  })

  const selectedAnswer = form.watch("option")
  useEffect(() => {
    if (selectedAnswer) {
      addSelectedAnswer(selectedAnswer)
    } else {
      removeSelectedAnswer(selectedAnswer)
    }
  }, [selectedAnswer, addSelectedAnswer, removeSelectedAnswer])

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">{question?.msgid}</h1>
        <p className="text-muted-foreground text-sm">
          {question?.additionalInfo}
        </p>
        <p>
          {question?.isMultipleChoice ? "Multiple Choice" : "Single Choice"}
        </p>
      </div>

      <pre className="font-kode-mono">{JSON.stringify(selectedAnswers, null, 2)}</pre>

      <Form {...form}>
        <FormField
          control={form.control}
          name="option"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {question?.answers.map((answer) => (
                    <FormItem
                      key={answer.msgid}
                      className="flex items-center gap-4"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={answer.msgid}
                          className="size-6"
                        />
                      </FormControl>
                      <FormLabel className="text-md">{answer.msgid}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>

      <div>debug val: {form.watch("option")}</div>

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
