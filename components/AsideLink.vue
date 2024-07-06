<template>
  <NuxtLink
    :to="to"
    class="flex items-center justify-center gap-2 p-2 hover:underline lg:justify-start lg:p-0"
    v-slot="{ isExactActive }"
  >
    <Icon
      :name="iconName"
      class="opacity-30 text-2xl lg:w-6 lg:h-5 lg:opacity-40"
      :class="{ 'opacity-95': isExactActive }"
    />
    <div class="hidden lg:block">
      <slot />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router'

defineProps<{
  iconName: string
  to: string | RouteLocationRaw
}>()
</script>

<style scoped>
.router-link-exact-active {
  @apply font-semibold text-sky-900 opacity-90;
}
</style>
