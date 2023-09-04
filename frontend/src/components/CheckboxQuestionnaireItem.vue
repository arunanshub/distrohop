<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
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
        v-if="modelValue?.includes(answer.id)"
        :is-important="isImportant"
        @click="toggleImportance"
      />
    </div>

    <LazyConflictingAnswersList
      v-if="conflictingAnswers.length > 0 && modelValue?.includes(answer.id)"
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

const emits = defineEmits<{
  'change:important-answer': [
    answer: { answerId: string; isImportant: boolean },
  ]
}>()

const answersStore = useAnswersStore()

const modelValue = defineModel<string[]>()

const isImportant = ref(false)

function toggleImportance() {
  isImportant.value = !isImportant.value
  emits('change:important-answer', {
    answerId: props.answer.id,
    isImportant: isImportant.value,
  })
}

function onAnswerChange() {
  isImportant.value = false
  if (modelValue.value?.includes(props.answer.id)) {
    answersStore.add(props.answer.id)
  } else {
    answersStore.remove(props.answer.id)
  }
}

const conflictingAnswers = computed(() => {
  return props.answer.blockedBy.filter((answerId) => answersStore.has(answerId))
})
</script>
