<template>
  <div
    class="mx-auto flex w-full max-w-screen-lg gap-2 px-2 leading-relaxed lg:gap-4 lg:px-0"
  >
    <TheAside>
      <AsideLink aria-label="Welcome" to="/" icon-name="material-symbols:login">
        Welcome
      </AsideLink>

      <QuizAsideLink
        v-for="section in sections"
        :icon-name="section.iconName"
        :key="section.msgid"
        :section-id="section.msgid"
      >
        {{ section.msgid.substring(0, 20) }}
      </QuizAsideLink>

      <button
        class="mt-auto flex items-center justify-center gap-2 border border-black bg-white p-2 lg:mt-4"
        aria-label="Show Results"
        disabled
      >
        <Icon name="carbon:result" size="1.1rem" class="lg:opacity-60" />
        <span class="hidden p-1 lg:block">Show Results</span>
      </button>
    </TheAside>

    <main class="w-full min-w-0 bg-white px-4 py-4 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Home' })

defineOgImageComponent('NuxtSeo')

const { sections, error } = await useFetchSection()

// basic 404 error handling in case sections are not available
// for some reason.
if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Could not load the quiz sections',
    fatal: true,
  })
}

// we set the name of the first section here, and it is used to navigate
// to the first quiz section.
useState('firstSectionName', () => sections.value?.at(0)?.msgid)
</script>
