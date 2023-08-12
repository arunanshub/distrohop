<template>
  <Title>Home</Title>

  <div
    class="mx-auto flex w-full max-w-screen-lg gap-2 pr-2 leading-relaxed lg:gap-4 lg:pr-0"
  >
    <aside
      class="w-18 flex select-none flex-col gap-2 pl-2 text-center lg:w-60 lg:pl-0"
    >
      <AsideLink to="/" icon-name="material-symbols:login">Welcome</AsideLink>
      <AsideLink to="/" icon-name="material-symbols:login">Welcome</AsideLink>
      <AsideLink to="/" icon-name="material-symbols:login">
        Software: Use Case
      </AsideLink>
      <!-- <AsideLink to="/">Computer knowledge</AsideLink>
      <AsideLink to="/">Computer knowledge</AsideLink>
      <AsideLink to="/">Hardware support</AsideLink>
      <AsideLink to="/">Source for help</AsideLink>
      <AsideLink to="/">User experience</AsideLink>
      <AsideLink to="/">Distributions: Price</AsideLink>
      <AsideLink to="/">Distributions: Scope</AsideLink>
      <AsideLink to="/">Distributions: Ideology</AsideLink>
      <AsideLink to="/">Distributions: Privacy</AsideLink>
      <AsideLink to="/">Administration</AsideLink>
      <AsideLink to="/">Software: Updates</AsideLink> -->

      <button
        class="mt-auto flex items-center justify-center gap-2 border border-black bg-white p-2"
      >
        <Icon name="carbon:result" size="1.1rem" class="lg:opacity-60" />
        <span class="hidden p-1 lg:block">Show Results</span>
      </button>
    </aside>

    <div class="grow bg-white px-4 py-4 lg:px-8">
      <NuxtPage />
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
