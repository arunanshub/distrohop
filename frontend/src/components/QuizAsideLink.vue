<template>
  <AsideLink
    :to="{ name: 'index-quiz-section', params: { section: sectionId } }"
    :icon-name="iconName"
  >
    <slot />
  </AsideLink>
</template>

<script setup lang="ts">
defineProps<{
  sectionId: string
  iconName: string
}>()
</script>
