<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <input
        type="radio"
        :id="answer.id"
        :value="answer.id"
        v-model="selectedOption"
        @change="onAnswerChange"
        class="h-5 w-5 shrink-0 border-gray-300 bg-gray-100 text-blue-600"
      />
      <label :for="answer.id" class="min-w-0 break-words">
        {{ answer.id }}
      </label>
      <LazyStarButton
        v-if="selectedOption === answer.id"
        :is-important="isImportant"
        @click="toggleImportance"
      />
    </div>

    <LazyConflictingAnswersList
      v-if="selectedOption === answer.id && conflictingAnswers.length > 0"
      :conflicting-answers="conflictingAnswers"
    />
  </div>
</template>

<script setup lang="ts">
import Answer from '~/types/Answer'
import { useAnswersStore } from '~/stores/answers'

const props = defineProps<{
  answer: Answer
  allowedAnswers: Answer[]
}>()

const answersStore = useAnswersStore()

const selectedOption = ref<string>()

const isImportant = ref(false)

const conflictingAnswers = computed(() => {
  return props.answer.blockedBy.filter((answerId) =>
    answersStore.hasAnswer(answerId)
  )
})

function toggleImportance() {
  isImportant.value = !isImportant.value
  if (isImportant.value) {
    answersStore.addImportantAnswer(props.answer.id)
  } else {
    answersStore.removeImportantAnswer(props.answer.id)
  }
}

function onAnswerChange() {
  // if the answer is changed, reset the importance toggle and add
  // the answer to store
  isImportant.value = false
  // remove answer that was previously selected (and possibly
  // marked important) but now a different answer is selected.
  props.allowedAnswers.map((answer) => {
    answersStore.removeAnswer(answer.id)
    answersStore.removeImportantAnswer(answer.id)
  })
  if (selectedOption.value) {
    answersStore.addAnswer(selectedOption.value)
  }
}
</script>
