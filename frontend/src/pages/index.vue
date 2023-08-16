<template>
  <Title>Home</Title>

  <div
    class="mx-auto flex w-full max-w-screen-lg gap-2 pr-2 leading-relaxed lg:gap-4 lg:pr-0"
  >
    <aside
      class="w-18 flex select-none flex-col gap-2 pl-2 text-center lg:w-60 lg:pl-0"
    >
      <AsideLink to="/" icon-name="material-symbols:login">Welcome</AsideLink>
      <AsideLink to="/" icon-name="mdi:poll">Software: Use Case</AsideLink>
      <AsideLink to="/" icon-name="ic:round-monitor">
        Computer knowledge
      </AsideLink>
      <AsideLink to="/" icon-name="codicon:terminal-linux"
        >Linux and You
      </AsideLink>
      <AsideLink to="/" icon-name="material-symbols:checklist-rtl">
        Installation Defaults
      </AsideLink>
      <AsideLink to="/" icon-name="bi:gpu-card">Hardware support</AsideLink>
      <AsideLink to="/" icon-name="material-symbols:question-mark">
        Source for help
      </AsideLink>
      <AsideLink to="/" icon-name="simple-icons:windows">
        User experience
      </AsideLink>
      <AsideLink to="/" icon-name="bi:currency-dollar">
        Distributions: Price
      </AsideLink>
      <AsideLink to="/" icon-name="fa6-solid:box-open">
        Distributions: Scope
      </AsideLink>
      <AsideLink to="/" icon-name="ri:open-source-fill">
        Distributions: Ideology
      </AsideLink>
      <AsideLink to="/" icon-name="mdi:shield-check">
        Distributions: Privacy
      </AsideLink>
      <AsideLink to="/" icon-name="clarity:administrator-solid">
        Administration
      </AsideLink>
      <AsideLink to="/" icon-name="material-symbols:browser-updated">
        Software: Updates
      </AsideLink>

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
