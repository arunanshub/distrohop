<template>
  <button class="flex bg-transparent">
    <Icon
      :name="isImportant ? 'ph:star-fill' : 'ph:star'"
      class="text-[#ff7a00]"
      size="1.3rem"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{ isImportant?: boolean }>()
</script>
