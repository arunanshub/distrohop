<template>
  <div>
    <div class="flex items-center gap-2">
      <input
        type="radio"
        :value="answer.msgid"
        :id="answer.msgid"
        v-model="selectedAnswer"
        class="h-5 w-5 shrink-0 border-gray-300 bg-gray-100 text-blue-600"
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
import { type Answer } from '@/types'

const collectedAnswers = defineModel<Set<string>>('collectedAnswers', {
  required: true,
})

const importantAnswers = defineModel<Set<string>>('importantAnswers', {
  required: true,
})

// radio can select at most one value, hence we need a separate defineModel to pass
// the values
const selectedAnswer = defineModel<string>({ required: true })

const props = defineProps<{
  // this answer
  answer: Answer
  // the answers that are a part of a specific question
  currentAnswers: Answer[]
}>()

const isAnswerCollected = computed(() =>
  collectedAnswers.value.has(props.answer.msgid)
)

if (isAnswerCollected.value) {
  selectedAnswer.value = props.answer.msgid
}

// remove the previously selected answer and set the new answer
// and reset the importance
watch(selectedAnswer, (newValue, oldValue) => {
  collectedAnswers.value.add(newValue)
  collectedAnswers.value.delete(oldValue)
  removeImportantAnswer()
})

const { conflictingAnswers } = useConflictingAnswers(
  collectedAnswers,
  props.answer
)

const { toggleImportantAnswer, isAnswerImportant, removeImportantAnswer } =
  useImportantAnswers(importantAnswers, props.answer)
</script>
