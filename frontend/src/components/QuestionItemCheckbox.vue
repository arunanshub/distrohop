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
import type { Answer } from '@/types'

const collectedAnswers = defineModel<Set<string>>('collectedAnswers', {
  required: true,
})

const importantAnswers = defineModel<Set<string>>('importantAnswers', {
  required: true,
})

const props = defineProps<{
  // this answer
  answer: Answer
  // the answers that are a part of a specific question
  currentAnswers: Answer[]
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
