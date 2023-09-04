<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <input
        type="radio"
        :id="answer.id"
        :value="answer.id"
        v-model="modelValue"
        @change="onAnswerChange"
        class="h-5 w-5 shrink-0 border-gray-300 bg-gray-100 text-blue-600"
      />
      <label :for="answer.id" class="min-w-0 break-words">
        {{ answer.id }}
      </label>
      <LazyStarButton
        v-if="modelValue === answer.id"
        :is-important="isImportant"
        @click="toggleImportance"
      />
    </div>

    <LazyConflictingAnswersList
      v-if="conflictingAnswers.length > 0 && modelValue === answer.id"
      :conflicting-answers="conflictingAnswers"
    />
  </div>
</template>

<script setup lang="ts">
import Answer from '~/types/Answer'
import { useAnswersStore } from '~/store/answers'

const props = defineProps<{
  answer: Answer
  allowedAnswers: Answer[]
}>()

const emits = defineEmits<{
  'change:important-answer': [
    answer: { answerId: string; isImportant: boolean },
  ]
}>()

const answersStore = useAnswersStore()

const modelValue = defineModel<string>()

const isImportant = ref(false)

// emit an event every time the importance of an answer is changed
function toggleImportance() {
  isImportant.value = !isImportant.value
  emits('change:important-answer', {
    answerId: props.answer.id,
    isImportant: isImportant.value,
  })
}

// if the answer is changed, reset the importance toggle and add
// the answer to store
function onAnswerChange() {
  isImportant.value = false
  // model value is not an array, which means it is a radio option
  if (!Array.isArray(modelValue.value)) {
    props.allowedAnswers.map((answer) => answersStore.remove(answer.id))
    if (modelValue.value) {
      answersStore.add(modelValue.value)
    }
  }
}

const conflictingAnswers = computed(() => {
  return props.answer.blockedBy.filter((answerId) => answersStore.has(answerId))
})
</script>
