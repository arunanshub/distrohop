<template>
  <div class="flex h-full flex-col gap-2">
    <div
      class="flex grow flex-col items-center justify-center gap-2"
      v-if="questionPending"
    >
      <PageTitle>Loading Question...</PageTitle>
      <Icon name="eos-icons:loading" size="4rem"></Icon>
    </div>
    <template v-else>
      <PageTitle>{{ question?.msgid }}</PageTitle>

      <!-- question item -->
      <QuestionListCheckbox
        v-if="question?.isMultipleChoice"
        :answers="question?.answers ?? []"
        v-model:collected-answers="collectedAnswers"
        v-model:important-answers="importantAnswers"
      />
      <QuestionListRadio
        v-else
        :answers="question?.answers ?? []"
        v-model:collected-answers="collectedAnswers"
        v-model:important-answers="importantAnswers"
      />

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
    </template>
  </div>
</template>

<script setup lang="ts">
useServerHead({ title: 'Quiz' })
// set title on the client side here since the <Title /> tag causes render issue
useHead({ title: 'Quiz' })

definePageMeta({
  scrollToTop: false,
  middleware: async (to) => {
    const currentSection = to.params.section as string
    // XXX: nuxt says that you cannot use a composable outside of setup or
    // custom composable. For the same reason, we cannot use useFetchSection()
    // in the middleware. We will resort to direct `$fetch` call.
    let sections
    try {
      sections = await $fetch('/api/sections')
    } catch (error) {
      return abortNavigation({ statusCode: 404, message: 'No sections found' })
    }
    const isSectionValid = !!sections.find(
      (s) => s.msgid === currentSection
    )

    if (!isSectionValid) {
      return abortNavigation({
        statusCode: 404,
        message: `Section '${currentSection}' not found`,
      })
    }
  },
})

const route = useRoute()

const currentSectionName = computed(() => route.params.section as string)

// fetch caches its arguments so calling it again is no issue
const { sections } = await useFetchSection()

const sectionsArray = ref(sections.value ?? [])
const {
  currentSection,
  nextSection,
  previousSection,
  goToNextSection,
  goToPreviousSection,
} = useSectionNav(currentSectionName, sectionsArray)

const { question, pending: questionPending } =
  await useFetchQuestion(currentSection)

const collectedAnswers = useState('collectedAnswers', () => new Set<string>())
const importantAnswers = useState('importantAnswers', () => new Set<string>())
</script>
