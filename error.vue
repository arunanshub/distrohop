<template>
  <div class="min-h-dvh flex flex-col bg-neutral-100">
    <TheHeader />
    <div class="mt-[15vh] flex grow flex-col items-center gap-4 text-center">
      <h1 class="text-6xl font-semibold">{{ error.statusCode }}</h1>
      <p class="text-2xl" v-if="error.message && error.message !== ''">
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
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{ error: NuxtError }>()

useServerHead({ title: props.error.statusCode.toString() })

async function handleError() {
  await clearError({
    redirect: '/',
  })
}
</script>
