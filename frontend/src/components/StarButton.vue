<template>
  <button class="bg-transparent">
    <Icon
      :name="isImportant ? 'ph:star-fill' : 'ph:star'"
      color="#ff7a00"
      size="1.3rem"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{ isImportant?: boolean }>()
</script>
