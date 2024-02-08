<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="answer in answers"
      :key="answer.msgid"
      class="flex flex-col gap-2"
    >
      <QuestionItemCheckbox
        v-model:collected-answers="collectedAnswers"
        v-model:important-answers="importantAnswers"
        :current-answers="answers"
        :answer="answer"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
// FIXME: currently there is no proper way to add types to
// attribute of a bigger query. Here, answer actually comes from
// a query for question by msgid. the answer is a part of the query
// but there is no specific type to represent that.
// For reference: https://github.com/drizzle-team/drizzle-orm/issues/695
import type { AnswerWithBlockedBlockedBy } from '@/server/crud/answer'

defineProps<{
  answers: AnswerWithBlockedBlockedBy[]
}>()

const collectedAnswers = defineModel<Set<string>>('collectedAnswers', {
  required: true,
})

const importantAnswers = defineModel<Set<string>>('importantAnswers', {
  required: true,
})
</script>
