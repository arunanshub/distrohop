<template>
  <Title v-if="data?.title">{{ data.title }}</Title>
  <article
    class="prose prose-neutral prose-a:no-underline hover:prose-a:underline mx-auto w-full grow px-8 pb-8 2xl:px-0"
  >
    <LazyContentRenderer :value="data" v-if="data" />
  </article>
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
