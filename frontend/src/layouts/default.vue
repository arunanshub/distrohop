<template>
  <div class="min-h-screen-dynamic flex flex-col bg-neutral-100">
    <LazyTheHeader />
    <div class="flex grow flex-col">
      <slot />
    </div>
    <LazyTheFooter />
  </div>
</template>
