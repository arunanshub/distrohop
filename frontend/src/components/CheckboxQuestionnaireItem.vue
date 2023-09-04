<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
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
        v-if="selectedOption.includes(answer.id)"
        :is-important="isImportant"
        @click="toggleImportance"
      />
    </div>

    <LazyConflictingAnswersList
      v-if="conflictingAnswers.length > 0 && selectedOption.includes(answer.id)"
      :conflicting-answers="conflictingAnswers"
    />
  </div>
</template>

<script setup lang="ts">
import Answer from '~/types/Answer'
import { useAnswersStore } from '~/store/answers'

const props = defineProps<{
  answer: Answer
}>()

const answersStore = useAnswersStore()

const selectedOption = ref<string[]>([])

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
  isImportant.value = false
  if (selectedOption.value.includes(props.answer.id)) {
    answersStore.addAnswer(props.answer.id)
  } else {
    answersStore.removeAnswer(props.answer.id)
    answersStore.removeImportantAnswer(props.answer.id)
  }
}
</script>
