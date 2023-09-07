<template>
  <LazyNuxtLink
    :to="to"
    class="flex items-center justify-center gap-2 p-2 hover:underline lg:justify-start lg:p-0"
    v-slot="{ isExactActive }"
  >
    <LazyIcon
      :name="iconName"
      size="1.5rem"
      class="h-full opacity-30 lg:h-5 lg:opacity-40"
      :class="{ 'opacity-95': isExactActive }"
    />
    <div class="hidden lg:block">
      <slot />
    </div>
  </LazyNuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  iconName: string
  to: string
}>()
</script>

<style scoped>
.router-link-exact-active {
  @apply font-semibold text-sky-900 opacity-90;
}
</style>
