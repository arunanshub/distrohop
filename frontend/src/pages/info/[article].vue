<template>
  <Title v-if="data?.title">{{ data.title }}</Title>
  <article
    class="prose prose-p:text-black prose-a:no-underline hover:prose-a:underline mx-auto w-full grow px-8 pb-8 lg:px-0"
  >
    <LazyServerContentRenderer :value="data" v-if="data" />
  </article>
</template>

<script setup lang="ts">
const path = useRoute().path

const { data, error } = await useAsyncData(path, () => {
  return queryContent(path).only(['title', 'body']).findOne()
})

if (error.value || data.value?._empty) {
  throw createError({
    statusCode: 404,
    statusMessage: 'The page you are looking for does not exist.',
    fatal: true,
  })
}
</script>
