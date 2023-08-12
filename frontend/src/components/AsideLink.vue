<template>
  <NuxtLink
    :to="to"
    class="flex items-center justify-center gap-2 p-2 hover:underline"
  >
    <Icon :name="iconName" size="1.5rem" class="h-full lg:h-5 lg:opacity-40" />
    <div class="hidden lg:block">
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
