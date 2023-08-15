<template>
  <div
    class="prose mx-auto w-full max-w-screen-lg grow hyphens-auto px-8 pb-8 text-justify 2xl:px-0"
  >
    <LazyContentRenderer :value="data!" v-if="data" />
  </div>
</template>

<script setup lang="ts">
const { path } = useRoute()

const { data, error, pending } = await useLazyAsyncData(
  `content-${path}`,
  () => {
    return queryContent().where({ _path: path }).findOne()
  }
)

if (error.value || (!pending.value && data.value?._empty)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'The page you are looking for does not exist.',
  })
}
</script>
