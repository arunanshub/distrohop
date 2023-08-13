<template>
  <div class="min-h-screen-dynamic flex flex-col bg-neutral-100">
    <TheHeader />
    <div class="flex grow flex-col">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
.min-h-screen-dynamic {
  /* prettier-ignore */
  @apply min-h-screen min-h-[100dvh];
}
</style>
