<template>
  <div class="min-h-screen-dynamic flex flex-col bg-neutral-100">
    <NuxtLoadingIndicator color="#3c3c3c" />
    <TheHeader />
    <div class="flex grow flex-col">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
