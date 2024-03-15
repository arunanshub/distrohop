import type { SectionWithoutId } from '~/server/crud/section'

export default function (
  currentSectionName: Ref<string>,
  sections: Ref<SectionWithoutId[]>,
) {
  const currentSectionIndex = computed(() =>
    sections.value.findIndex(
      (section) => section.msgid === currentSectionName.value,
    ),
  )

  const currentSection = computed(() =>
    sections.value.at(currentSectionIndex.value),
  )

  const nextSection = computed(() =>
    sections.value.at(currentSectionIndex.value + 1),
  )

  const previousSection = computed(() => {
    return currentSectionIndex.value === 0
      ? undefined
      : sections.value.at(currentSectionIndex.value - 1)
  })

  async function goToNextSection() {
    await navigateTo({
      name: 'index-quiz-section',
      params: { section: nextSection.value?.msgid },
    })
  }

  async function goToPreviousSection() {
    await navigateTo({
      name: 'index-quiz-section',
      params: { section: previousSection.value?.msgid },
    })
  }

  return {
    goToNextSection,
    goToPreviousSection,
    currentSection,
    nextSection,
    previousSection,
  } as const
}
