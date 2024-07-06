<template>
  <div class="flex flex-col bg-yellow-300 p-3">
    <span class="pb-1">
      Following answers are in conflict with this answer:
    </span>
    <ul class="flex flex-col gap-1">
      <li
        class="flex items-center gap-2"
        v-for="conflictingAnswer in conflictingAnswers"
        :key="conflictingAnswer"
      >
        <Icon
          name="material-symbols:warning-outline"
          size="0.8rem"
          class="text-red-600 mt-1"
        />
        <span>"{{ conflictingAnswer }}"</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  conflictingAnswers: string[]
}>()
</script>
