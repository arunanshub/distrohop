<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="answer in answers"
      :key="answer.msgid"
      class="flex items-center gap-2"
    >
      <input
        type="checkbox"
        :value="answer.msgid"
        :id="answer.msgid"
        v-model="modelValue"
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

const modelValue = defineModel<string[]>({ required: true })

defineProps<{
  answers: Answer[]
}>()
</script>
