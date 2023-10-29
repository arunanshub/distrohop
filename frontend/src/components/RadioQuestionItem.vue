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
      />
      <label :for="answer.msgid" class="min-w-0 break-words">
        {{ answer.msgid }}
      </label>
      <!-- add a star later -->
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Answer } from '~/types'

const props = defineProps<{
  answers: Answer[]
}>()

const modelValue = defineModel<string[]>({ required: true })

const selectedAnswer = ref<string>()

// get the selected answer from the list of answers and set it.
const activeAnswer = props.answers
  .filter((ans) => modelValue.value.includes(ans.msgid))
  .at(0)?.msgid
selectedAnswer.value = activeAnswer

watch(selectedAnswer, (newValue, oldValue) => {
  if (newValue === undefined) {
    return
  }
  modelValue.value.push(newValue)
  modelValue.value = modelValue.value.filter((ans) => ans !== oldValue)
})
</script>
