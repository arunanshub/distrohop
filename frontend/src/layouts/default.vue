<template>
  <div class="flex min-h-[100dvh] flex-col bg-neutral-100">
    <TheHeader />
    <div class="flex grow flex-col">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>
