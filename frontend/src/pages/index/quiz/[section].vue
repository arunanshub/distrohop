<template>
  <Title>Quiz</Title>

  <div class="flex h-full flex-col gap-2">
    <p>Q: {{ question?.msgid }} {{ question?.answers.map((x) => x.msgid) }}</p>
    <p>Section: {{ currentSectionName }}</p>
    <p v-if="nextSection">N: {{ nextSection?.msgid }}</p>
    <p v-if="previousSection">P: {{ previousSection?.msgid }}</p>

    <!-- button row -->
    <div class="ml-auto mt-auto flex gap-4">
      <button
        v-if="previousSection"
        @click="goToPreviousSection"
        class="btn-secondary"
      >
        Previous
      </button>
      <button v-if="nextSection" @click="goToNextSection" class="btn-primary">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
useServerHead({ title: 'Quiz' })

const route = useRoute()

const currentSectionName = computed(() => route.params.section as string)

// fetch caches its arguments so calling it again is no issue
const { sections } = await useFetchSection()

if (
  !sections.value?.find((section) => section.msgid === currentSectionName.value)
) {
  showError({
    statusCode: 404,
    message: `Section '${currentSectionName.value}' not found`,
  })
}

const sectionsArray = ref(sections.value ?? [])

const {
  currentSection,
  nextSection,
  previousSection,
  goToNextSection,
  goToPreviousSection,
} = useSectionNav(currentSectionName, sectionsArray)
const { question } = await useFetchQuestion(currentSection)
</script>
