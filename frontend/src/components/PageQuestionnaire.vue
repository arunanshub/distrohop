<template>
  <div class="flex flex-col gap-2">
    <PageTitle>{{ question.id }}</PageTitle>
    <div class="flex flex-col gap-2">
      <template v-if="radio">
        <RadioQuestionnaireItem
          v-for="answer in answers"
          :key="answer.id"
          :question="question"
          :answer="answer"
          :allowed-answers="answers"
        />
      </template>
      <template v-else>
        <CheckboxQuestionnaireItem
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
