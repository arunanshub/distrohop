<template>
  <Title v-if="data?.title">{{ data.title }}</Title>
  <div
    class="prose mx-auto w-full max-w-screen-lg grow px-8 pb-8 text-justify 2xl:px-0"
    v-if="data"
  >
    <LazyContentRenderer :value="data!" v-if="data" />
  </div>
</template>

<script setup lang="ts">
const { path } = useRoute()

const { data, error } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})

if (error.value || data.value?._empty) {
  showError({
    statusCode: 404,
    statusMessage: `The page you are looking for does not exist`,
  })
}
</script>
