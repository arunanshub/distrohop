<template>
  <main>
    <article
      class="prose prose-p:text-black prose-a:no-underline hover:prose-a:underline mx-auto w-full grow px-8 pb-8 lg:px-0"
    >
      <LazyServerContentRenderer :value="data" v-if="data" />
    </article>
  </main>
</template>

<script setup lang="ts">
const path = useRoute().path

const { data, error } = await useAsyncData(path, () => {
  return queryContent(path).only(['title', 'body']).findOne()
})

useServerSeoMeta({ title: data.value?.title })

defineOgImageComponent('NuxtSeo')

if (error.value || !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'The page you are looking for does not exist.',
  })
}
</script>
