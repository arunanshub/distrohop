<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="answer in answers"
      :key="answer.msgid"
      class="flex items-center gap-2"
    >
      <input
        type="checkbox"
        :value="answer.msgid"
        :id="answer.msgid"
        v-model="collectedAnswers"
        class="h-5 w-5 shrink-0 border-gray-300 bg-gray-100 text-blue-600"
        @change="removeImportantAnswer(answer.msgid)"
      />
      <label :for="answer.msgid" class="min-w-0 break-words">
        {{ answer.msgid }}
      </label>
      <StarButton
        v-if="collectedAnswers.has(answer.msgid)"
        :is-important="isImportantAnswer(answer.msgid)"
        @click="toggleImportantAnswer(answer.msgid)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Answer } from '~/types'

defineProps<{
  answers: Answer[]
}>()

const collectedAnswers = defineModel<Set<string>>('collectedAnswers', {
  required: true,
})

const importantAnswers = defineModel<Set<string>>('importantAnswers', {
  required: true,
})

const { toggleImportantAnswer, isImportantAnswer, removeImportantAnswer } =
  useImportantAnswers(importantAnswers)
</script>
