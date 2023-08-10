<template>
  <NuxtLink :to="to" class="flex items-center justify-center gap-2">
    <Icon :name="iconName" size="1.5rem" class="h-full md:h-5 md:opacity-40" />
    <div class="hidden md:block">
      <slot />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  iconName: string
  to: string
}>()
</script>
