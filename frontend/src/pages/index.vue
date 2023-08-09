<template>
  <Title>Home</Title>

  <div class="mx-auto flex w-full max-w-5xl leading-relaxed">
    <aside class="flex w-20 flex-col gap-4 p-4 text-center md:w-40">
      <AsideLink to="/" icon-name="material-symbols:login"> Welcome </AsideLink>
    </aside>

    <div class="flex grow flex-col gap-2 bg-white p-4">
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
        <IntroItem
          icon-name="material-symbols:delete-outline"
          icon-color="gray"
        >
          You can delete answers at any time
        </IntroItem>
        <IntroItem
          icon-name="material-symbols:star-outline"
          icon-color="#1d4ed8"
        >
          Mark answers as important to give them more weight
        </IntroItem>
        <IntroItem
          icon-name="material-symbols:favorite-outline"
          icon-color="red"
        >
          Please rate your results, depending on how well they fit your needs
        </IntroItem>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  @apply font-semibold text-sky-900;
}
</style>
