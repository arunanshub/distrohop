<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="answer in answers"
      :key="answer.msgid"
      class="flex flex-col gap-2"
    >
      <QuestionItemRadio
        v-model="selectedAnswer"
        v-model:important-answers="importantAnswers"
        v-model:collected-answers="collectedAnswers"
        :current-answers="answers"
        :answer="answer"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
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

const selectedAnswer = ref('')
</script>
