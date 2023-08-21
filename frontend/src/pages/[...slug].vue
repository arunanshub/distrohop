<template>
  <Title v-if="data?.title">{{ data.title }}</Title>
  <div
    class="prose mx-auto w-full max-w-screen-lg grow hyphens-auto px-8 pb-8 text-justify 2xl:px-0"
  >
    <LazyContentRenderer :value="data" v-if="data" />
  </div>
</template>

<script setup lang="ts">
import { hash } from 'ohash'
import { withTrailingSlash } from 'ufo'

const path = withTrailingSlash(useRoute().path)

const { data, error } = await useAsyncData(`content-${hash(path)}`, () => {
  return queryContent(path).findOne()
})

if (error.value || data.value?._empty) {
  throw createError({
    statusCode: 404,
    statusMessage: 'The page you are looking for does not exist.',
  })
}
</script>
