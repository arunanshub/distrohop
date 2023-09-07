<template>
  <Title>{{ error.statusCode }}</Title>
  <div class="min-h-screen-dynamic flex flex-col bg-neutral-100">
    <LazyTheHeader />
    <div class="mt-[15vh] flex grow flex-col items-center gap-4 text-center">
      <h1 class="text-6xl font-semibold">{{ error.statusCode }}</h1>
      <p class="text-2xl" v-if="error.statusMessage">
        {{ error.statusMessage }}
      </p>
      <button
        class="mt-4 border border-black bg-white p-4 hover:bg-slate-200"
        @click="handleError"
      >
        Go Back Home
      </button>
    </div>
    <LazyTheFooter />
  </div>
</template>

<script setup lang="ts">
import { NuxtError } from 'nuxt/app'

defineProps<{ error: NuxtError }>()

async function handleError() {
  await clearError({
    redirect: '/',
  })
}
</script>
