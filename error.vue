<template>
  <div class="min-h-dvh flex flex-col bg-neutral-100">
    <TheHeader />
    <div class="mt-[15vh] flex grow flex-col items-center gap-4 text-center">
      <h1 class="text-6xl font-semibold">{{ error?.statusCode }}</h1>
      <p class="text-2xl" v-if="error?.message && error?.message !== ''">
        {{ error.message }}
      </p>
      <button
        v-if="$route.path !== '/'"
        class="mt-4 border border-black bg-white p-4 hover:bg-slate-200"
        @click="handleError"
      >
        Go Back Home
      </button>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

// Can only use seo meta on client side.
// See: https://nuxt.com/docs/guide/directory-structure/error
// Archived: https://archive.ph/xkxTY
useSeoMeta({
  title: `${props.error?.statusCode.toString()}`,
  description: () => {
    if (props.error?.statusCode === 404) {
      return 'The page you are looking for does not exist.'
    }
    return 'An unexpected error occured'
  },
})

async function handleError() {
  // do not redirect because the default behaviour on pressing the back button
  // is to expect the 404 page to show up again.
  await clearError({ redirect: '/' })
}
</script>
