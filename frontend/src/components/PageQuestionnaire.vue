<template>
  <div class="flex flex-col gap-2">
    <LazyPageTitle>{{ question.id }}</LazyPageTitle>
    <div class="flex flex-col gap-2">
      <template v-if="radio">
        <LazyRadioQuestionnaireItem
          v-for="answer in answers"
          :key="answer.id"
          :question="question"
          :answer="answer"
          :allowed-answers="answers"
        />
      </template>
      <!-- the else if exists solely to aid with typing  -->
      <template v-else>
        <LazyCheckboxQuestionnaireItem
          v-for="answer in answers"
          :key="answer.id"
          :question="question"
          :answer="answer"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Question from '~/types/Question'
import Answer from '~/types/Answer'

defineProps<{
  question: Question
  answers: Answer[]
  radio?: boolean
}>()
</script>
