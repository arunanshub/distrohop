<template>
  <div class="min-h-screen-dynamic flex flex-col bg-neutral-100">
    <NuxtLoadingIndicator class="w-full h-16" />
    <TheHeader />
    <div class="flex grow flex-col">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
