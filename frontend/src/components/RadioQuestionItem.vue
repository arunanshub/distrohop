<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="answer in answers"
      :key="answer.msgid"
      class="flex items-center gap-2"
    >
      <input
        type="radio"
        :value="answer.msgid"
        :id="answer.msgid"
        v-model="selectedAnswer"
        class="h-5 w-5 shrink-0 border-gray-300 bg-gray-100 text-blue-600"
        @change="removeImportantAnswer(answer.msgid)"
      />
      <label :for="answer.msgid" class="min-w-0 break-words">
        {{ answer.msgid }}
      </label>
      <StarButton
        v-if="collectedAnswers.includes(answer.msgid)"
        :is-important="isImportantAnswer(answer.msgid)"
        @click="toggleImportantAnswer(answer.msgid)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Answer } from '~/types'

const props = defineProps<{
  answers: Answer[]
}>()

const collectedAnswers = defineModel<string[]>('collectedAnswers', {
  required: true,
})

const importantAnswers = defineModel<string[]>('importantAnswers', {
  required: true,
})

const { toggleImportantAnswer, isImportantAnswer, removeImportantAnswer } =
  useImportantAnswers(importantAnswers)

const selectedAnswer = ref<string>()

// get the selected answer from the list of answers and set it.
const activeAnswer = props.answers
  .filter((ans) => collectedAnswers.value.includes(ans.msgid))
  .at(0)?.msgid
selectedAnswer.value = activeAnswer

watch(selectedAnswer, (newValue, oldValue) => {
  if (newValue === undefined) {
    return
  }
  collectedAnswers.value.push(newValue)
  collectedAnswers.value = collectedAnswers.value.filter(
    (ans) => ans !== oldValue
  )
  oldValue && removeImportantAnswer(oldValue)
})
</script>
