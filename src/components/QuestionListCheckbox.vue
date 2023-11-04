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
import type { Answer } from '@/types'

defineProps<{
  answers: Answer[]
}>()

const collectedAnswers = defineModel<Set<string>>('collectedAnswers', {
  required: true,
})

const importantAnswers = defineModel<Set<string>>('importantAnswers', {
  required: true,
})
</script>
