<template>
  <div class="flex flex-col gap-2">
    <h1 class="hidden text-2xl font-semibold md:block">
      Welcome to Distrohop!
    </h1>
    <div>
      Welcome! This test will help you choose a suitable Linux distribution.
    </div>
    <ul class="flex flex-col gap-2">
      <IntroItem icon-name="material-symbols:skip-next" icon-color="#b45309">
        You can always skip questions
      </IntroItem>
      <IntroItem icon-name="material-symbols:help-outline" icon-color="green">
        You can receive additional information using the question mark icon
      </IntroItem>
      <IntroItem
        icon-name="material-symbols:recommend-outline"
        icon-color="#eab308"
      >
        You can always click on 'your recommendation' to receive your result
      </IntroItem>
      <IntroItem icon-name="solar:reorder-bold-duotone" icon-color="purple">
        You may answer in arbitrary order
      </IntroItem>
      <IntroItem icon-name="material-symbols:delete-outline" icon-color="gray">
        You can delete answers at any time
      </IntroItem>
      <IntroItem icon-name="material-symbols:star-outline" icon-color="#1d4ed8">
        Mark answers as important to give them more weight
      </IntroItem>
      <IntroItem icon-name="material-symbols:favorite-outline" icon-color="red">
        Please rate your results, depending on how well they fit your needs
      </IntroItem>
    </ul>
    <div class="mt-4 flex">
      <button class="btn-primary justify-end" @click="startTest">
        Start test
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const firstSectionName = useState<string>('firstSectionName')

function startTest() {
  navigateTo({
    name: 'index-quiz-section',
    params: { section: firstSectionName.value },
  })
}
</script>
