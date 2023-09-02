<template>
  <!--
    By default, the <fieldset> element has a CSS property called min-inline-size set to min-content
    This can lead to situations where the fieldset doesn't expand to accommodate its content.
  -->
  <fieldset class="min-w-0">
    <legend class="pb-4 text-justify">
      <PageTitle>{{ question.id }}</PageTitle>
    </legend>
    <div class="flex flex-col gap-2">
      <template v-if="radio && typeof selectedAnswers === 'string'">
        <RadioQuestionnaireItem
          v-for="answer in answers"
          :key="answer.id"
          v-model="selectedAnswers"
          :question="question"
          :answer="answer"
          :allowed-answers="answers"
          @change:important-answers="updateImportantAnswers"
          @change="onAnswersUpdate"
        />
      </template>
      <!-- the else if exists solely to aid with typing  -->
      <template v-else-if="Array.isArray(selectedAnswers)">
        <CheckboxQuestionnaireItem
          v-for="answer in answers"
          :key="answer.id"
          v-model="selectedAnswers"
          :question="question"
          :answer="answer"
          @change:important-answers="updateImportantAnswers"
          @change="onAnswersUpdate"
        />
      </template>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import Question from '~/types/Question'
import Answer from '~/types/Answer'

const props = defineProps<{
  question: Question
  answers: Answer[]
  radio?: boolean
}>()

const emits = defineEmits<{
  'change:answers': [
    {
      selectedAnswers: string | string[]
      importantAnswers: string[]
    },
  ]
}>()

const selectedAnswers = ref<string | string[]>(props.radio ? '' : [])

const importantAnswers = ref<Set<string>>(new Set())

function convertToArray<T>(x: T | T[]): T[] {
  return Array.isArray(x) ? [...x] : [x]
}

function updateImportantAnswers(answer: {
  answerId: string
  isImportant: boolean
}) {
  // we can have only one important answer if the questionnaire is a "radio" choice
  if (props.radio) {
    importantAnswers.value.clear()
  }
  if (answer.isImportant) {
    importantAnswers.value.add(answer.answerId)
  } else {
    importantAnswers.value.delete(answer.answerId)
  }
  emits('change:answers', {
    selectedAnswers: convertToArray(selectedAnswers.value),
    importantAnswers: [...importantAnswers.value],
  })
}

function onAnswersUpdate() {
  emits('change:answers', {
    selectedAnswers: convertToArray(selectedAnswers.value),
    importantAnswers: [...importantAnswers.value],
  })
}
</script>
