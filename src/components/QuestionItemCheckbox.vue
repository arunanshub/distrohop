<template>
  <div>
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
        :value="answer.msgid"
        :id="answer.msgid"
        v-model="collectedAnswers"
        class="h-5 w-5 shrink-0 border-gray-300 bg-gray-100 text-blue-600"
        @change="removeImportantAnswer"
      />
      <label :for="answer.msgid" class="min-w-0 break-words">
        {{ answer.msgid }}
      </label>
      <StarButton
        v-if="isAnswerCollected"
        :is-important="isAnswerImportant"
        @click="toggleImportantAnswer"
      />
    </div>
    <ConflictingAnswersList
      v-if="isAnswerCollected && conflictingAnswers.length !== 0"
      :conflicting-answers="conflictingAnswers"
    />
  </div>
</template>

<script setup lang="ts">
// FIXME: currently there is no proper way to add types to
// attribute of a bigger query. Here, answer actually comes from
// a query for question by msgid. the answer is a part of the query
// but there is no specific type to represent that.
// For reference: https://github.com/drizzle-team/drizzle-orm/issues/695
import type { AnswerWithBlocksBlockedBy } from '@/server/crud/question'

const collectedAnswers = defineModel<Set<string>>('collectedAnswers', {
  required: true,
})

const importantAnswers = defineModel<Set<string>>('importantAnswers', {
  required: true,
})

const props = defineProps<{
  // this answer
  answer: AnswerWithBlocksBlockedBy
  // the answers that are a part of a specific question
  currentAnswers: AnswerWithBlocksBlockedBy[]
}>()

const isAnswerCollected = computed(() =>
  collectedAnswers.value.has(props.answer.msgid)
)

const { conflictingAnswers } = useConflictingAnswers(
  collectedAnswers,
  props.answer
)

const { toggleImportantAnswer, isAnswerImportant, removeImportantAnswer } =
  useImportantAnswers(importantAnswers, props.answer)
</script>
